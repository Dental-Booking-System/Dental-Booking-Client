import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../theme/colors.ts";
import {useDispatch} from "react-redux";
import {logOut} from "../redux/authSlice.ts";
import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {reset} from "../redux/patientSlice.ts";

function Account() {
    const dispatch = useDispatch();

    function signOut() {
        auth().signOut().then(async () => {
            await GoogleSignin.revokeAccess();
            dispatch(reset());
            console.log("Sign out successfully!");
        }).catch(err => {
            if (auth().currentUser == null) {
                dispatch(logOut());
            }
        });
    }

    return (
        <View style={styles.profileContainer}>
            <TouchableOpacity
                style={{
                    width: '35%',
                    height: '7%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    backgroundColor: colors.primary
                }}
                onPress={() => signOut()}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 17,
                        fontWeight: '600'
                    }}
                >Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default Account;