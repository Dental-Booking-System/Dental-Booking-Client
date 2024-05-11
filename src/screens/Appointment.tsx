import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CloseIcon from "../assets/closeIcon.svg";
import DateTimePicker from "../components/DateTimePicker.tsx";
import PatientInput from "../components/PatientInput.tsx";
import ServiceInput from "../components/ServiceInput.tsx";
import React, {memo, SetStateAction, useCallback, useEffect, useState} from "react";
import {colors} from "../theme/colors.ts";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import LoadingModal from "../components/modals/LoadingModal.tsx";


type Props = {
    toggleSheet: () => void;
}

function Appointment(props: Props) {

    const [showLoading, setShowLoading] = useState(false);

    /**
     * Appointment Info
     */
    const date = useSelector((state: RootState) => state.appointment.date);
    const time = useSelector((state: RootState) => state.appointment.time);
    const name = useSelector((state: RootState) => state.patient.name);
    const phone = useSelector((state: RootState) => state.patient.phone);
    const birthDate = useSelector((state: RootState) => state.patient.birthDate);
    const gender = useSelector((state: RootState) => state.patient.gender);
    const additionalInfo = useSelector((state: RootState) => state.appointment.additionalInfo);
    const service = useSelector((state: RootState) => state.appointment.service);

    /**
     * Phone OTP
     */
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');
    //
    function onAuthStateChanged(user: any) {
        if (user) {
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber: any) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch(err) {
            console.log(err);
        }
    }

    async function confirmCode() {
        try {
            if (confirm) await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    /**
     * Submit appointment and phone OTP
     */
    async function handleSubmit() {
        // Check if phone is registered
        // signInWithPhoneNumber(phone).then(() => {
        //     setShowLoading(false);
        // });
        // signInWithPhoneNumber(phone);
        // console.log({
        //     date: date,
        //     time: time,
        //     service: service,
        //     name: name,
        //     phone: phone,
        //     birthDate: birthDate,
        //     gender: gender,
        //     additionalInfo: additionalInfo
        // })
        const isRegistered = await checkRegisteredPhoneNumber(phone);
        if (!isRegistered) {
            await signInWithPhoneNumber(phone);
            console.log(auth().currentUser?.uid);
            return
        }
        console.log(auth().currentUser?.uid);
    }

    async function checkRegisteredPhoneNumber(phoneNumber: string) {
        return fetch(`http://localhost:8080/api/check-phone-number?phoneNumber=${phone.substring(1)}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
               return json;
            })
            .catch((err) => {
                throw err;
            });
    }


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
                               fill={'#545454'}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal={false}
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <DateTimePicker />
                <ServiceInput />
                <PatientInput />

                <TouchableOpacity
                    onPress={() => handleSubmit()}
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
                {confirm && (
                    <>
                        <TextInput value={code} onChangeText={text => setCode(text)} />
                        <Button title="Confirm Code" onPress={() => confirmCode()} />
                    </>
                )}
                <LoadingModal isVisible={showLoading}/>
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
        flex: 1
    },

    scrollViewContentContainer: {
        flexGrow: 1
    },

    nameContainer: {
        borderWidth: 1
    },

    ageContainer: {
        borderWidth: 1
    }
})

export default Appointment;