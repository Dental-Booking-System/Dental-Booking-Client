import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {colors} from "../theme/colors.ts";
import GoogleIcon from "../assets/googleIcon.svg";
import PersonIcon from "../assets/personIcon.svg";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {logIn} from "../redux/authSlice.ts";


GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
});


function Login() {

    const dispatch = useDispatch();

    async function signInWithGoogle() {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            console.log("id token: " + idToken);
            console.log(googleCredential);

        } catch (err) {
            throw err;
        }
    }

    async function signIn() {
        try {
            await signInWithGoogle();
            dispatch(logIn());
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.LoginContainer}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={async () => {
                    await signIn();
                }}
            >
                <GoogleIcon
                    height={30} width={30}
                />
                <Text style={styles.textStyle}>Đăng ký bằng Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => dispatch(logIn())}
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
        </View>
    )
}

const styles = StyleSheet.create({
    LoginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 12
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