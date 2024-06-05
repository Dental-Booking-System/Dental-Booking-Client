import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CloseIcon from "../assets/closeIcon.svg";
import AppointmentInput from "../components/AppointmentInput.tsx";
import PatientInput from "../components/PatientInput.tsx";
import React, {memo, SetStateAction, useCallback, useEffect, useState} from "react";
import {colors} from "../theme/colors.ts";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import LoadingModal from "../components/modals/LoadingModal.tsx";
import Animated from "react-native-reanimated";
import AlertModal from "../components/modals/AlertModal.tsx";
import {localeDateStringToISODateString} from "../utils/DateFormatter.ts";
import ConfirmModal from "../components/modals/ConfirmModal.tsx";

type Props = {
    toggleSheet: () => void;
}

function Appointment(props: Props) {

    const [showConfirm, setShowConfirm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    /**
     * Appointment Info
     */
    const date = useSelector((state: RootState) => state.appointment.date);
    const time = useSelector((state: RootState) => state.appointment.time);
    const service = useSelector((state: RootState) => state.appointment.service);
    const name = useSelector((state: RootState) => state.patient.name);
    const phone = useSelector((state: RootState) => state.patient.phone);
    const birthDate = useSelector((state: RootState) => state.patient.birthDate);
    const gender = useSelector((state: RootState) => state.patient.gender);
    const additionalInfo = useSelector((state: RootState) => state.appointment.additionalInfo);

    const validateInput = () => {
        if (!date || !time || !service) {
            return ({complete: false, alert: "Xin vui lòng điền thời gian đặt lịch và dịch vụ."});
        }
        if  (!name || !phone || !birthDate || !gender) {
            return ({complete: false, alert: "Xin vui lòng điền đầy đủ thông tin cá nhân."});
        }
        return ({complete: true, alert: "none"});
    }

    /**
     * Submit appointment
     */
     function handleSubmit() {
         const input = validateInput()
         if (!input.complete){
             setAlertText(input.alert);
            setShowAlert(true);
            return null
        }
         setShowLoading(true);
         const url = "http://localhost:8080/api/appointments";
         const appointmentData = {
             patient_uid: auth().currentUser?.uid,
             doctor_id: 1,
             dental_service_id: Number(service.key),
             start_time: `${date}T${time}`,
         };
         return fetch(url, {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(appointmentData)
         })
             .then((res) => {
                 if (!res.ok) throw new Error("Time not available");
             })
             .catch(err => {
                 console.log(err)
             })
             .finally(() => {
                 setShowLoading(false);
             })

    }
    return (
        <View style={styles.appointmentContainer}>
            <View style={styles.appointmentHeader}>
                <Text
                    style={{
                        fontSize: 28,
                        fontFamily: "Helvetica Neue",
                        flexWrap: "wrap"
                    }}
                >
                    Đặt lịch hẹn</Text>
                <TouchableOpacity
                    onPress={props.toggleSheet}
                    style={{
                        height: "70%",
                        paddingTop: "2%",
                    }}
                >
                    <CloseIcon width={25} height={25}
                               fill={'#545454'}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal={false}
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <AppointmentInput />
                <PatientInput />
                <TouchableOpacity
                    onPress={() => {
                        handleSubmit()
                        setShowConfirm(true)
                    }}
                >
                    <View style={{
                        backgroundColor: colors.primary,
                        height: 50,
                        borderRadius: 15,
                        width: '85%',
                        alignSelf: "center",
                        marginTop: "10%",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 18,
                            fontWeight: "400",
                            fontFamily: "Helvetica Neue",
                            fontStyle: "italic"
                        }}>
                            Đặt lịch
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <ConfirmModal isVisible={showConfirm} setIsVisible={setShowConfirm}/>
            <LoadingModal isVisible={showLoading} text={"Xử lí lịch hẹn"}/>

            <AlertModal
                isVisible={showAlert}
                setIsVisible={setShowAlert}
                text={alertText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    appointmentContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: '5%',
        paddingTop: "8%",
        flex: 1
    },

    appointmentHeader: {
        height: '5%',
        top: '-24.5%',
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        gap: 80,
    },

    scrollViewContainer: {
        // borderWidth: 1,
        height: "90%",
        bottom: "8%",
        flex: 1,
    },

    scrollViewContentContainer: {
        flexGrow: 1,
    },

    nameContainer: {
        borderWidth: 1
    },

    ageContainer: {
        borderWidth: 1
    }
})

export default Appointment;