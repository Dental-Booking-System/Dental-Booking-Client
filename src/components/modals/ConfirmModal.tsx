import {Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {colors} from "../../theme/colors.ts";
import CloseIcon from "../../assets/closeIcon.svg";
import {TouchableHighlight} from "react-native-gesture-handler";
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/authSlice.ts";

type Props = {
    isVisible: boolean,
    setIsVisible: any
}

function ConfirmModal(props: Props) {
    const dispatch = useDispatch();
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
                            Đăng ký để đặt lịch hẹn
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'Helvetica Neue',
                                fontWeight: '400',
                                color: colors.grey,
                                alignSelf: "center"
                            }}
                        >
                            Bạn cần đăng ký tài khoản để sử dụng tính năng đặt lịch hẹn
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
                                dispatch(logOut())
                            }}
                        >
                            <Text style={{
                                alignSelf: "center",
                                fontSize: 15,
                                color: 'white',
                                fontWeight: '600'
                            }}>
                                Đăng ký
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>
    )
}

export default ConfirmModal;