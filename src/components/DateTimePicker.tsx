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

type Props = {
    handleSetDate: (date: Date) => void,
    date: Date
}

const DateTimePicker = memo(function DateTimePicker(props: Props) {
    const [open, setOpen] = useState(false);
    const [daysArray, setDaysArray] = useState<{ id: number, currentDay: Date; isSelected: boolean }[]>([]);
    const [timesColumnArray, setTimeColumnArray] = useState<{ time: string, isSelected: boolean }[][]>([]);
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
        let chosenDate = props.date
        const updatedDaysArray = daysArray.map((val) => {
            if (val.id === selectedID) {
                chosenDate = val.currentDay
                return {...val, isSelected: true};
            }
            return {...val, isSelected: false};
        });
        setDaysArray(updatedDaysArray);
        props.handleSetDate(chosenDate);
    };

    const handleTimePress = (selectedTime: string) => {
        const updatedTimesArray = timesColumnArray.map(column => {
            return (column.map(timeItem => {
                if (selectedTime == timeItem.time) return {...timeItem, isSelected: true};
                return {...timeItem, isSelected: false};
            }))
        })
        setTimeColumnArray(updatedTimesArray);
    }

    useEffect(() => {
        const chosenDate = props.date;
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
            days.push({id: i, currentDay, isSelected: i == props.date.getDate()});
            if (i == props.date.getDate()) chosenIndex = i - initialDateNum;
        }
        setDaysArray(days);
    }, [props.date]);

    useEffect(() => {
        for (let i = 0; i < daysArray.length; i++) {
            if (daysArray[i].isSelected) {
                flatListRef.current?.scrollToIndex({index: i - 1 < 0 ? i : i - 1, animated: true});
                return;
            }
        }
    }, [props.date, daysArray]);

    useEffect(() => {
        let updatedTimesArray: { id: string, time: string; isSelected: boolean; }[][] = []
        timesArray.forEach( column => {
            let updatedColumn: { id: string, time: string; isSelected: boolean; }[] = [];
            column.forEach(time => {
                updatedColumn.push({
                    id: time,
                    time: time,
                    isSelected: false
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
                        <Text style={styles.dateText}>{` ${props.date.getDate()}/${props.date.getMonth() + 1}/${props.date.getFullYear()}`}</Text>
                        <ArrowDownIcon fill={colors.black}/>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={props.date}
                    mode={"date"}
                    minimumDate={minDate}
                    onConfirm={(date) => {
                        setOpen(false);
                        props.handleSetDate(date);
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