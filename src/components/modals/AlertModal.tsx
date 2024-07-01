import {Modal, StyleSheet, View, ActivityIndicator, Text, Button, TouchableOpacity} from "react-native";
import React from "react";
import {colors} from "../../theme/colors.ts";
import CloseIcon from "../../assets/closeIcon.svg";
import {logOut} from "../../redux/authSlice.ts";

type Props = {
    isVisible: boolean
    setIsVisible: any,
    text: string
}

function AlertModal(props: Props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
            statusBarTranslucent={false}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0004'
                }}
            >
                <View style={{
                    backgroundColor: '#ffffff',
                    height: '25%',
                    width: '70%',
                    borderRadius: 20,
                    padding: '5%'
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: "flex-end",
                        paddingHorizontal: "5%",
                        paddingTop: '1%'
                    }}>
                        <TouchableOpacity
                            onPress={() => props.setIsVisible(false)}
                        >
                            <CloseIcon width={22} height={22}
                                       fill={'#545454'}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 5,
                        gap: 10,
                        justifyContent: "flex-start",
                        paddingTop: "7%"
                    }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: 'Helvetica Neue',
                                fontWeight: '500',
                                alignItems: "center",
                                alignSelf: "center"
                            }}
                        >
                            Đặt lịch không thành công
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'Helvetica Neue',
                                fontWeight: '500',
                                color: colors.grey,
                                alignSelf: "center"
                            }}
                        >
                            {props.text}
                        </Text>
                    </View>
                    <View style={{
                        flex: 2.7,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity
                            style={{
                                width: "50%",
                                borderRadius: 10,
                                height: "80%",
                                justifyContent: "center",
                                backgroundColor: colors.primary
                            }}
                            onPress={() => {
                                props.setIsVisible(false)
                            }}
                        >
                            <Text style={{
                                alignSelf: "center",
                                fontSize: 15,
                                color: 'white',
                                fontWeight: '600'
                            }}>
                                Đồng ý
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>
    )
}

export default AlertModal;