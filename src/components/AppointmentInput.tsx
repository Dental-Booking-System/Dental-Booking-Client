import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {memo, useEffect, useRef, useState} from "react";
import ArrowDownIcon from "../assets/arrowDownIcon.svg"
import {colors} from "../theme/colors.ts";
import DateCard from "./cards/DateCard.tsx";
import TimeCard from "./cards/TimeCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {onChangeDate, onChangeService, onChangeTime} from "../redux/appointmentSlice.ts";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    isoTimeToLocalTimeString,
    localeDateStringToISODateString,
    toVietnamDateString
} from "../utils/DateFormatter.ts";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SelectList} from "react-native-dropdown-select-list";
import auth from "@react-native-firebase/auth";

const AppointmentInput = memo(function DateTimePicker() {
    const [dateState, setDateState] = useState(new Date());
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [daysArray, setDaysArray] = useState<{ id: number, currentDay: Date; isSelected: boolean }[]>([]);
    const [isFetchingTime, setIsFetchingTime] = useState(true);
    const minDate = new Date();
    const weekdays = ['chủ nhật', 'thứ hai', 'thứ ba', 'thứ tư', 'thứ năm', 'thứ sáu', 'thứ bảy'];
    const timesArray= ["09:00 AM", "12:00 PM", "03:00 PM", "03:00 PM",
        "03:00 PM","09:00 AM", "12:00 PM", "03:00 PM", "03:00 PM", "03:00 PM",
    ]
    const [timesArrayState, setTimesArrayState] = useState<{isSelected: boolean, isoTime: string; timeText: string}[]>([]);
    const flatListRef = useRef<FlatList>(null);
    const [serviceArrayState, setServiceArrayState] = useState<{ key: string; value: string; approxDuration: number }[]>([]);
    const [serviceState, setServiceState] = useState<{ key: string; value: string; approxDuration: number }>();
    const handleDatePress = (selectedID: number) => {
        let chosenDate = dateState;
        const updatedDaysArray = daysArray.map((val) => {
            if (val.id === selectedID) {
                chosenDate = val.currentDay
                return {...val, isSelected: true};
            }
            return {...val, isSelected: false};
        });
        setDaysArray(updatedDaysArray);
        setDateState(chosenDate);
        dispatch(onChangeDate(toVietnamDateString(chosenDate)));
    };

    const handleTimePress = (selectedTime: string) => {
        const updatedTimesArray = timesArrayState.map(item => {
            if (item.timeText === selectedTime) {
                dispatch(onChangeTime(item.isoTime));
                return {
                    ...item,
                    isSelected: true
                }
            }
            return {
                ...item,
                isSelected: false
            }
        })
        setTimesArrayState(updatedTimesArray);
    }

    const fetchAvailableTime = async (date: Date, service: { key: string; value: string; approxDuration: number }) => {
        setIsFetchingTime(true)
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        const localDate = toVietnamDateString(date)
        try {
            await sleep(500);
            const res = await fetch(`${process.env.BASE_URL}/api/appointments/available-times?date=${localDate}&duration=${service.approxDuration}`, {
                headers: {
                    "Authorization": `Bearer ${await auth().currentUser?.getIdToken()}`
                }
            });
            return await res.json();
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        const chosenDate = dateState;
        let chosenIndex = 0;
        const days = [];
        const lastDayOfMonth = new Date(chosenDate.getFullYear(), chosenDate.getMonth() + 1, 0).getDate();
        let initialDate = new Date();
        let initialDateNum = initialDate.getDate();
        if (chosenDate.getMonth() > initialDate.getMonth() && chosenDate.getFullYear() >= initialDate.getFullYear()) {
            initialDateNum = 1;
        }
        // Loop through each day from current date to the end of the month
        for (let i = initialDateNum; i <= lastDayOfMonth; i++) {
            const currentDay = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), i);
            // Push the current date to the array
            days.push({id: i, currentDay, isSelected: i == chosenDate.getDate()});
            if (i == chosenDate.getDate()) chosenIndex = i - initialDateNum;
        }
        setDaysArray(days);
    }, [dateState]);

    useEffect(() => {
        for (let i = 0; i < daysArray.length; i++) {
            if (daysArray[i].isSelected) {
                flatListRef.current?.scrollToIndex({index: i - 1 < 0 ? i : i - 1, animated: true});
                break;
            }
        }
    }, [dateState]);


    useEffect(() => {
        let updatedAvailableTimes: { isSelected: boolean; isoTime: string; timeText: string; }[] = []
        if (serviceState){
            fetchAvailableTime(dateState, serviceState).then(( data:any ) => {
                data.forEach( (time: string) => {
                    updatedAvailableTimes?.push({
                        isSelected: false,
                        isoTime: time,
                        timeText: isoTimeToLocalTimeString(time)
                    })
                })
                setTimesArrayState(updatedAvailableTimes);
                setIsFetchingTime(false);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [dateState, serviceState]);

    useEffect(() => {
        dispatch(onChangeDate(toVietnamDateString(dateState)));
    }, []);

    useEffect( () =>  {
        auth().currentUser?.getIdToken().then(token => {
            fetch(`${process.env.BASE_URL}/api/dental-services`,{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }).then(res => {
                res.json().then(data => {
                    let updatedServices: { key: any; value: any; approxDuration: number }[] = []
                    data.forEach((serviceItem : any) => {
                        updatedServices.push({
                            key: serviceItem.id.toString(),
                            value: serviceItem.name,
                            approxDuration: serviceItem.approxDuration
                        })
                    })
                    setServiceArrayState(updatedServices);
                })
            })
                .catch(err => {
                    console.log(err)
                })
        })
            .catch(err => {
                console.log(err)
            })

    }, []);

    return (
        <View style={styles.datePickerContainer} >
            <View style={{
                gap: 12
            }}>
                <Text style={{
                    paddingHorizontal: '2%',
                    fontFamily: "Helvetica",
                    fontSize: 23,
                    fontWeight: "bold",
                }}>
                    Dịch vụ
                </Text>
                <SelectList
                    setSelected={(key: string) => {
                        const selectedService = serviceArrayState.find(serviceItem => serviceItem.key == key);
                        if (selectedService) {
                            dispatch(onChangeService(selectedService));
                            setServiceState(selectedService);
                        }
                    }}
                    data={serviceArrayState}
                    save="key"
                    fontFamily={"Helvetica Neue"}
                    placeholder={"Hãy chọn dịch vụ"}
                    inputStyles={{
                        fontWeight: "400",
                        fontSize: 16,
                        color: "#2c2c2c"
                    }}
                    boxStyles={{
                        borderWidth: 0.4,
                    }}
                    dropdownStyles={{
                        borderWidth: 0.4
                    }}
                    dropdownTextStyles={{
                        color: "#2c2c2c"
                    }}
                />
            </View>
            <View style={styles.dateContainer}>
                <View >
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.dateTitleContainer}
                    >
                        <Text style={{
                            fontSize: 23,
                            fontFamily: "Helvetica Neue",
                            fontWeight: "bold"
                        }}>Ngày khám: </Text>
                        <Text style={styles.dateText}>{`${dateState.getDate()}/${dateState.getMonth() + 1}/${dateState.getFullYear()}`}</Text>
                        <ArrowDownIcon fill={colors.black}/>
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    isVisible={open}
                    date={dateState}
                    mode={"date"}
                    locale="en_GB"
                    display={"inline"}
                    minimumDate={minDate}
                    onConfirm={(date) => {
                        setDateState(date);
                        setOpen(false);
                        dispatch(onChangeDate(toVietnamDateString(date)));
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
                <FlatList
                    initialScrollIndex={0}
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 200));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                    }}
                    style={styles.scrollViewContainer}
                    horizontal={true}
                    contentContainerStyle={styles.scrollViewContentContainer}
                    ref={flatListRef}
                    data={daysArray}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.6}
                                style={{
                                    backgroundColor: item.isSelected ? colors.primary : 'white',
                                    borderRadius: 12
                                }}
                                onPress={() => handleDatePress(item.id)}
                            >
                                <DateCard
                                    title={item.currentDay.getDate().toString()}
                                    subtitle={weekdays[item.currentDay.getDay()]}
                                    style={{
                                        color: item.isSelected ? 'white' : colors.grey
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>
            </View>
            { serviceState &&
                <View style={styles.timePicker}>
                    <Text
                        style={{
                            fontFamily: "Helvetica",
                            fontSize: 23,
                            paddingHorizontal: "2%",
                            fontWeight: "bold"
                        }}
                    >Thời gian đặt lịch</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            paddingVertical: '3%',
                            flex: 1,
                            gap: 4
                        }}
                    >
                        {isFetchingTime? (timesArray.map((value, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 15,
                                        padding: '1%'
                                    }}>
                                    <SkeletonPlaceholder>
                                        <View style={{
                                            borderWidth: 0.3,
                                            height: 40,
                                            width: 75,
                                            borderRadius: 15,
                                            borderColor: colors.secondary,
                                        }}>
                                        </View>
                                    </SkeletonPlaceholder>
                                </View>

                            )
                        })) :
                            (timesArrayState.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            backgroundColor: item.isSelected ? colors.primary : 'white',
                                            borderRadius: 15,
                                            padding: '1%'
                                        }}
                                        onPress={() => handleTimePress(item.timeText)}
                                    >
                                        <TimeCard
                                            timeText={item.timeText}
                                            style = {{
                                                color: item.isSelected ? 'white' : colors.grey,
                                                fontSize: 13
                                            }}
                                        />

                                    </TouchableOpacity>

                                )
                            }))
                        }

                    </View>
                </View>
            }

        </View>
    )
});

const styles = StyleSheet.create({
    datePickerContainer: {
        // borderWidth: 1,
        gap: 12,
    },

    dateContainer: {
        // borderWidth: 1,
        flex: 0.75,
        flexDirection: "column",
        gap: 12
    },

    dateTitleContainer: {
        flexDirection: "row",
        // borderWidth: 1,
        alignItems: "center",
        gap: 5,
        width: "80%"
    },

    dateText: {
        fontSize: 22,
        fontFamily: "Helvetica Neue",
        fontWeight: "500"
    },
    scrollViewContainer: {
        // borderWidth: 1,
    },

    scrollViewContentContainer: {
        alignItems: "center",
        gap: 12
    },

    timePicker: {
        // borderWidth: 1,
        flex: 1,
    },

    timeScrollViewContainer: {
        // borderWidth: 1,
        marginTop: "2%"
    },

    timeColumn: {
        // borderWidth: 1,
        width: 85,
        flexDirection: "column",
        justifyContent: "space-evenly"
    },

    timeScrollViewContentContainer: {
        gap: 15
    }
})

export default AppointmentInput;