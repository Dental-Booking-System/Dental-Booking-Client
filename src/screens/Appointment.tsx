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
                    style={{
                        height: "70%",
                        paddingTop: "2%",
                    }}
                >
                    <CloseIcon width={25} height={25}
                               style={styles.closeIcon}
                               fill={'#545454'}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <DateTimePicker />
                <View style={styles.patientContainer}>
                {/*    service, name, age, phone, additional detail*/}
                    <View style={styles.nameContainer}>

                    </View>
                    <View style={styles.ageContainer}>

                    </View>
                </View>
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

    },

    scrollViewContainer: {
        // borderWidth: 1,
        height: "90%",
        bottom: "8%"
    },

    scrollViewContentContainer: {
    },

    patientContainer: {
        borderWidth: 1,
        height: '40%'
    },
    nameContainer: {
        borderWidth: 1
    },
    ageContainer: {
        borderWidth: 1
    }
})

export default Appointment;