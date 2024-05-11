import {
    FlatList, ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import DatePicker from "react-native-date-picker";
import {memo, SetStateAction, useEffect, useRef, useState} from "react";
import ArrowDownIcon from "../assets/arrowDownIcon.svg"
import {colors} from "../theme/colors.ts";
import DateCard from "./cards/DateCard.tsx";
import TimeCard from "./cards/TimeCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {onChangeDate, onChangeTime} from "../redux/appointmentSlice.ts";



const DateTimePicker = memo(function DateTimePicker() {
    const date = useSelector((state: RootState) => state.appointment.date);
    const time = useSelector((state: RootState) => state.appointment.time);
    const [dateState, setDateState] = useState(date == "" ? new Date() : new Date(date));
    const [timesColumnArray, setTimeColumnArray] = useState<{ time: string, isSelected: boolean }[][]>([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [daysArray, setDaysArray] = useState<{ id: number, currentDay: Date; isSelected: boolean }[]>([]);
    const minDate = new Date();
    const weekdays = ['chủ nhật', 'thứ hai', 'thứ ba', 'thứ tư', 'thứ năm', 'thứ sáu', 'thứ bảy'];
    const timesArray = [
        ["09:00 AM", "12:00 PM", "03:00 PM"],
        ["09:30 AM", "12:30 PM", "03:30 PM"],
        ["10:00 AM", "01:00 PM", "04:00 PM"],
        ["10:30 AM", "01:30 PM", "04:30 PM"],
        ["11:00 AM", "02:00 PM", "05:00 PM"],
    ]
    const flatListRef = useRef<FlatList>(null);
    const handlePress = (selectedID: number) => {
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
        dispatch(onChangeDate(chosenDate.toISOString()));
    };

    const handleTimePress = (selectedTime: string) => {
        const updatedTimesArray = timesColumnArray.map(column => {
            return (column.map(timeItem => {
                if (selectedTime == timeItem.time) {
                    return {...timeItem, isSelected: true};
                }
                return {...timeItem, isSelected: false};
            }))
        })
        dispatch(onChangeTime(selectedTime));
        setTimeColumnArray(updatedTimesArray);
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
                return;
            }
        }
    }, [dateState, daysArray]);

    useEffect(() => {
        let updatedTimesArray: { id: string, time: string; isSelected: boolean; }[][] = []
        timesArray.forEach( column => {
            let updatedColumn: { id: string, time: string; isSelected: boolean; }[] = [];
            column.forEach(timeString => {
                updatedColumn.push({
                    id: timeString,
                    time: timeString,
                    isSelected: timeString == time
                })
            })
            updatedTimesArray.push(updatedColumn);
        });
        setTimeColumnArray(updatedTimesArray);
    }, []);

    return (
        <View style={styles.datePickerContainer} >
            <View style={styles.dateContainer}>
                <View >
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.dateTitleContainer}
                    >
                        <Text style={styles.dateText}>{` ${dateState.getDate()}/${dateState.getMonth() + 1}/${dateState.getFullYear()}`}</Text>
                        <ArrowDownIcon fill={colors.black}/>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={dateState}
                    mode={"date"}
                    minimumDate={minDate}
                    onConfirm={(date) => {
                        setDateState(date);
                        setOpen(false);
                        dispatch(onChangeDate(date.toISOString()));
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
                                onPress={() => handlePress(item.id)}
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

            <View style={styles.timePicker}>
                <Text
                    style={{
                        fontFamily: "Helvetica",
                        fontSize: 23,
                        paddingHorizontal: "2%",
                        fontWeight: "bold"
                    }}
                >Thời gian đặt lịch</Text>
                <ScrollView
                    horizontal={true}
                    style={styles.timeScrollViewContainer}
                    contentContainerStyle={styles.timeScrollViewContentContainer}
                >
                    {timesColumnArray.map((column, index) => {
                        return (
                            <View
                                key={index}
                                style={styles.timeColumn}>
                                {column.map((timeItem, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleTimePress(timeItem.time)}
                                            style={{
                                                backgroundColor: timeItem.isSelected ? colors.primary : 'white',
                                                borderRadius: 15
                                            }}
                                        >
                                            <TimeCard
                                                timeText={timeItem.time}
                                                style = {{
                                                    color: timeItem.isSelected ? 'white' : colors.grey
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        )
                    })}
                </ScrollView>
            </View>

        </View>
    )
});

const styles = StyleSheet.create({
    datePickerContainer: {
        // borderWidth: 1,
        height: 350,
    },

    dateContainer: {
        // borderWidth: 1,
        flex: 0.75,
        flexDirection: "column"
    },

    dateTitleContainer: {
        flexDirection: "row",
        // borderWidth: 1,
        alignItems: "center",
        gap: 17,
        width: "80%"
    },

    dateText: {
        fontSize: 23,
        fontFamily: "Helvetica Neue",
        fontWeight: "bold"
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
        flex: 1
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

export default DateTimePicker;