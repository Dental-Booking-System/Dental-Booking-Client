import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field";
import {colors} from "../theme/colors.ts";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import LoadingModal from "../components/modals/LoadingModal.tsx";

const CELL_COUNT = 6;


type Props = NativeStackScreenProps<{
    'PhoneOTP' : any
},'PhoneOTP'>;

function PhoneOTP({route, navigation} : Props) {
    const confirm = route.params;
    const [showLoading, setShowLoading] = useState(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    async function confirmCode() {
        setShowLoading(true)
        try {
            //@ts-ignore
            await confirm.confirm(value);
            setShowLoading(false)
        } catch (error) {
            setShowLoading(false);
            console.log(error);
        }
    }

    async function reVerifyPhoneNumber() {
    }

    useEffect( () => {
        if (value.length == 6) {
            confirmCode().then(() => {
                console.log("Confirm code successfully!");
            }).catch(error => {
                console.log("Failed to confirm code!");
            });
        }
    }, [value]);

    return (
        <View style={styles.phoneLoginContainer}>
            <LoadingModal isVisible={showLoading} text={"Đang xác nhận số điện thoại"} />
            <View
                style={{
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Helvetica Neue',
                        fontWeight: '600',
                        fontSize: 25
                    }}
                >
                    Hãy nhập mã xác nhận
                </Text>
            </View>
            <View
                style={styles.OtpContainer}
            >
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    testID="my-code-input"
                    renderCell={({index, symbol, isFocused}) => (
                        <View
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                        >
                            <Text
                                onLayout={getCellOnLayoutHandler(index)}
                                style={{
                                    fontSize: 24,
                                    color: colors.grey
                                }}
                            >
                                {symbol || (isFocused ? <Cursor/> : null)}

                            </Text>
                        </View>
                    )}
                />
                <TouchableOpacity
                    onPress={() => reVerifyPhoneNumber()}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            textDecorationLine: 'underline',
                            color: colors.grey
                        }}
                    >
                        Gửi lại mã
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    phoneLoginContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        paddingHorizontal: '7%',
        paddingTop: '30%',
        gap: 30

    },
    OtpContainer: {
        gap: 15
    },
    title: {textAlign: 'center', fontSize: 100},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#00000030',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    focusCell: {
        borderColor: '#000',
    }


});

export default PhoneOTP;