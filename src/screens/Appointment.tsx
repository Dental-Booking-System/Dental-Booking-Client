import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CloseIcon from "../assets/closeIcon.svg";
import DateTimePicker from "../components/DateTimePicker.tsx";
import PatientInput from "../components/PatientInput.tsx";
import ServiceInput from "../components/ServiceInput.tsx";
import React, {memo, SetStateAction, useCallback, useEffect, useState} from "react";
import {colors} from "../theme/colors.ts";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';


type Props = {
    toggleSheet: () => void;
}

function Appointment(props: Props) {
    const [date, setDate] = useState(new Date());
    const [serviceSelected, setServiceSelected] = useState("");
    const [open, setOpen] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const [name, setName] = useState("");
    const [phone, setPhone] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [genderArray, setGenderArray] = useState<{gender: string, isSelected: boolean}[]>([]);

    const handleSetDate: (date: Date) => void = useCallback((date) => {
        setDate(date);
    }, []);

    const handleSetServiceSelected: (service: string) => void = useCallback((service) => {
        setServiceSelected(service);
    },[]);

    const handleSetOpen: (open: boolean) => void = useCallback((open) => {
        setOpen(open);
    }, []);

    const handleSetBirthDate: (date: Date) => void = useCallback((date) => {
        setBirthDate(date);
    }, []);

    const handleSetName: (name: string) => void = useCallback((name) => {
        console.log(name);
        setName(name);
    },[]);

    const handleSetPhone: (phone: string) => void = useCallback((phone: string) => {
        setPhone(phone);
    },[]);

    const handleSetAdditionalInfo: (info: string) => void = useCallback((info) => {
        setAdditionalInfo(info);
    },[]);

    const handleSetGenderArray: (updatedArray: any) => void = useCallback((updatedArray) => {
        setGenderArray(updatedArray);
    },[]);

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
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
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
    const handleSubmit = () => {
        console.log(phone);
        // signInWithPhoneNumber(phone);
    };

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
                <DateTimePicker date={date} handleSetDate={handleSetDate}/>
                <ServiceInput handleSetServiceSelected={handleSetServiceSelected}/>
                <PatientInput
                    open={open}
                    handleSetOpen={handleSetOpen}
                    birthDate={birthDate}
                    handleSetBirthDate={handleSetBirthDate}
                    name={name}
                    handleSetName={handleSetName}
                    phone={phone}
                    handleSetPhone={handleSetPhone}
                    genderArray={genderArray}
                    handleSetGenderArray={handleSetGenderArray}
                    info={additionalInfo}
                    handleSetAdditionalInfo={handleSetAdditionalInfo}
                />

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