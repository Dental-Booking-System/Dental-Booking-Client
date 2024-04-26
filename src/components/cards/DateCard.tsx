import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {colors} from "../../theme/colors.ts";

type Props = {
    title: string,
    subtitle: string,
    style: any
}

function DateCard(props: Props) {
    return (
        <View style={styles.dateCardContainer}>
            <Text
                style={{
                    alignSelf: "center",
                    fontSize: 23,
                    marginTop: "3%",
                    fontStyle: "italic",
                    fontFamily: "Helvetica Neue",
                    fontWeight: "600",
                    color: colors.grey,
                    ...props.style
                }}
            >
                {props.title}
            </Text>
            <Text
                style={{
                    alignSelf: "center",
                    fontStyle: "italic",
                    fontFamily: "Helvetica",
                    fontWeight: "500",
                    fontSize: 11,
                    color: colors.grey,
                    ...props.style

                }}
            >
                {props.subtitle.toUpperCase()}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dateCardContainer: {
        borderWidth: 0.3,
        height: 85,
        width: 78,
        justifyContent: "space-evenly",
        borderRadius: 12,
        borderColor: colors.secondary,
        gap: -5
    }

})

export default DateCard;
