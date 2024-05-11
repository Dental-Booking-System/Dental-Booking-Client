import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../theme/colors.ts";
import {useDispatch} from "react-redux";
import {logOut} from "../redux/authSlice.ts";

function Account() {
    const dispatch = useDispatch();
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
                onPress={() => dispatch(logOut())}
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