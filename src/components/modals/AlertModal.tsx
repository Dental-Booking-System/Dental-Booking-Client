import {Modal, StyleSheet, View, ActivityIndicator, Text, Button, TouchableOpacity} from "react-native";
import React from "react";
import {colors} from "../../theme/colors.ts";

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
            <View style={styles.modalContainer}>
                <View
                    style={{
                        justifyContent: "center",
                        height: "15%",
                        width: "70%",
                        backgroundColor: '#ffffff',
                        borderRadius: 12,
                        gap: 15
                    }}
                >
                    <Text
                        style={{
                            marginVertical: 15,
                            fontSize: 13,
                            textAlign: 'center',
                            fontWeight: '400',
                            color: 'black',
                            paddingTop: '6%',
                            paddingHorizontal: '6%'
                        }}
                    >
                        {props.text}
                    </Text>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            borderTopWidth: 0.2,
                            flex: 1,
                        }}
                        onPress={() => props.setIsVisible(false)}
                    >
                        <Text
                            style={{
                                alignSelf: "center",
                            }}
                        >
                            Đồng ý
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0008'
    }
})

export default AlertModal;