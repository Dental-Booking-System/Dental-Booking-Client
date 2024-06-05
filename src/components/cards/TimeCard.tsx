import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../theme/colors.ts";

type Props = {
    timeText: string,
    style: any
}

function TimeCard(props: Props) {

    const handlePress = () => {

    }

    return (
        <View style={styles.timeCardContainer}>
            <Text
                style={{
                    alignSelf: "center",
                    fontWeight: "500",
                    fontStyle: "italic",
                    color: colors.grey,
                    ...props.style
                }}
            >
                {props.timeText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    timeCardContainer: {
        borderWidth: 0.3,
        height: 40,
        width: 75,
        borderRadius: 15,
        borderColor: colors.secondary,
        justifyContent: "center"
    }
});

export default TimeCard;