import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {colors} from "../theme/colors.ts";
import GoogleIcon from "../assets/googleIcon.svg";
import PersonIcon from "../assets/personIcon.svg";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    webClientId: '823035123696-s170u9e0faveh4scmtp39vtei2q3cm4o.apps.googleusercontent.com',
});

type Props = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function Login(props: Props) {

    async function signInWithGoogle() {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);

        } catch (err) {
            throw err;
        }
    }

    async function signIn() {
        try {
            await signInWithGoogle();
            props.setIsLoggedIn(true);
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
                onPress={() => props.setIsLoggedIn(true)}
            >
                <PersonIcon style={{
                }} height={45} width={30}/>
                <Text style={styles.textStyle}>Đăng ký bằng số điện thoại</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{

                }}
                onPress={() => props.setIsLoggedIn(true)}
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