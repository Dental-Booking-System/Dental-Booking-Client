import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PhoneInput from "react-native-phone-input";
import React, {useEffect, useState} from "react";
import {onChangePhone} from "../redux/patientSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {colors} from "../theme/colors.ts";
import RightArrow from "../assets/arrowRight.svg";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import auth, {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';
import LoadingModal from "../components/modals/LoadingModal.tsx";

type Props = NativeStackScreenProps<{
    PhoneOTP: {},
}>;

function PhoneLogin({navigation} : Props) {
    const phone = useSelector((state: RootState) => state.patient.phone);
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(null);

    async function signInWithPhoneNumber(phone: string) {
        try{
            const confirmation = await auth().signInWithPhoneNumber(phone);
            // @ts-ignore
            setConfirm(confirmation);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (confirm) {
            navigation.navigate('PhoneOTP', confirm);
        }
    }, [confirm]);


    return (
        <View style={styles.phoneLoginContainer}>
            <Text
                style={{
                    fontFamily: 'Helvetica Neue',
                    fontWeight: '600',
                    fontSize: 25
                }}
            >
                Nhập số điện thoại
            </Text>

            <View style={styles.fieldInputContainer}>
                <PhoneInput
                    initialValue= {phone == "" ? "84": phone}
                    initialCountry={'vn'}
                    onChangePhoneNumber={(phone: string) => dispatch(onChangePhone(phone))}
                    style={[styles.textInput, {
                        backgroundColor: 'white'
                    }]}
                    textStyle={styles.textInput}
                />
            </View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 12
                }}
                onPress={() => signInWithPhoneNumber(phone)}
            >
                <Text
                    style={{
                        fontFamily: 'Helvetica Neue',
                        fontWeight: '600',
                        fontSize: 20,
                    }}
                >
                    Xác nhận
                </Text>
                <RightArrow style={{
                    height: 30,
                    width:20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '1.2%'
                }}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    phoneLoginContainer: {
        flex: 1,
        paddingTop: '30%',
        paddingHorizontal: '7%',
        backgroundColor: 'white',
        gap: 20
    },
    fieldInputContainer: {
        height: 75,
        width: '100%'
    },
    textInput: {
        borderWidth: 0,
        backgroundColor: colors.textInputBackgroundColor,
        borderRadius: 10,
        height: 40,
        fontFamily: 'Helvetica Neue',
        padding: 10,
        fontSize: 18,
    },

});

export default PhoneLogin;