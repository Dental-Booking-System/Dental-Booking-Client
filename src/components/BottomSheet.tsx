import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Animated, {
    SlideInDown,
    SlideOutDown,
} from "react-native-reanimated";
import StraightBarIcon from "../assets/straightBarIcon.svg"
import {colors} from "../theme/colors.ts";
import {GestureDetector} from "react-native-gesture-handler";

type Props = {
    content: React.ReactElement,
    style?: any,
    gesture?: any
}

function BottomSheet(props : Props) {


    return (
        <Animated.View
            style={[styles.bottomSheetContainer, props.style]}
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown.duration(400)}
        >
            <GestureDetector gesture={props.gesture} >
                <View style={styles.bottomSheetHeader}>
                    <StraightBarIcon style={styles.straightBarIcon} width={150}  fill={colors.secondary}/>
                </View>
            </GestureDetector>
            {props.content}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: '92.1%',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        zIndex: 2
    },

    bottomSheetHeader: {
        height: '10%',
        alignItems: 'center',
        padding: '2%',
        width: "50%",
        left: "25%",
        zIndex: 1
    },

    straightBarIcon: {
        top: 0,
    }
})

export default BottomSheet;