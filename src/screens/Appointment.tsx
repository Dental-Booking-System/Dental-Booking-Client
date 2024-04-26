import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CloseIcon from "../assets/closeIcon.svg";
import {colors} from "../theme/colors.ts";
import DateTimePicker from "../components/DateTimePicker.tsx";

type Props = {
    toggleSheet?: () => void
}

function Appointment(props: Props) {
    return (
        <View style={styles.appointmentContainer}>
            <View style={styles.appointmentHeader}>
                <Text
                    style={{
                        fontSize: 28,
                        fontFamily: "Helvetica Neue",
                        fontStyle: "italic",
                        flexWrap: "wrap"
                    }}
                >Đặt lịch hẹn</Text>
                <TouchableOpacity
                    onPress={props.toggleSheet}
                >
                    <CloseIcon width={25} height={25}
                               style={styles.closeIcon}
                               fill={colors.third}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <DateTimePicker />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    appointmentContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: '5%',
        paddingTop: "8%",
    },

    appointmentHeader: {
        height: '5%',
        top: '-24.5%',
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        gap: 80,
    },

    closeIcon: {
        marginBottom: '-50%',
    },

    scrollViewContainer: {
        // borderWidth: 1,
        height: "90%",
        bottom: "8%"
    },

    scrollViewContentContainer: {
    }
})

export default Appointment;