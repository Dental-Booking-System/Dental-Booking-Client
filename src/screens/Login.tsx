import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {colors} from "../theme/colors.ts";
import GoogleIcon from "../assets/googleIcon.svg";
import PersonIcon from "../assets/personIcon.svg";
import auth, {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {logIn} from "../redux/authSlice.ts";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import LoadingModal from "../components/modals/LoadingModal.tsx";

type Props = NativeStackScreenProps<{
    PhoneLogin: {}
}>;

GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
});


function Login({navigation} : Props) {

    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(false);
    /**
     * Google sign-in
     */
    async function signInWithGoogle() {
        try {
            const {idToken} = await GoogleSignin.signIn();
            setShowLoading(true);
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            setShowLoading(false);
        } catch (err) {
            setShowLoading(false);
            console.log(err)
        }
    }

    /**
     * Phone sign-in
     */
    async function signInWithPhone() {
        navigation.navigate('PhoneLogin', {})
    }

    return (
        <View style={styles.LoginContainer}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={async () => {
                    await signInWithGoogle();
                }}
            >
                <GoogleIcon
                    height={30} width={30}
                />
                <Text style={styles.textStyle}>Đăng ký bằng Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => signInWithPhone()}
            >
                <PersonIcon style={{
                }} height={45} width={30}/>
                <Text style={styles.textStyle}>Đăng ký bằng số điện thoại</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{

                }}
                onPress={() => dispatch(logIn())}
            >
                <Text style={[styles.textStyle, {
                    fontWeight: '400',
                    textDecorationLine: "underline",
                    fontSize: 13.5
                }]}>Đăng nhập ẩn danh</Text>
            </TouchableOpacity>
            <LoadingModal isVisible={showLoading} text={"Đang đăng nhập"} />

        </View>
    )
}

const styles = StyleSheet.create({
    LoginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 12,
        backgroundColor: 'white'
    },
    buttonStyle: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: colors.third,
        height: 65,
        width: 320,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 6,
        flexDirection: "row",
        gap: 22,
        paddingHorizontal: '5%'
    },
    textStyle: {
        fontFamily: "Helvetica Neue",
        fontSize: 16,
        fontWeight: "500"
    }
});

export default Login;