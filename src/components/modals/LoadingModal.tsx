import {Modal, StyleSheet, View, ActivityIndicator, Text} from "react-native";
import React from "react";

type Props = {
    isVisible?: boolean,
    text: string
}

function LoadingModal(props: Props) {
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.isVisible}
            >
                <View style={styles.modalContainer}>
                    <ActivityIndicator size={"large"} color={'white'}/>
                    <Text
                        style={{
                            marginVertical: 15,
                            fontSize: 20,
                            textAlign: 'center',
                            fontWeight: '500',
                            fontStyle: 'italic',
                            color: 'white'
                        }}
                    >
                        {props.text}
                    </Text>
                </View>

            </Modal>
        </View>

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

export default LoadingModal;