import {StyleSheet, Text, View} from "react-native";
import {colors} from "../../theme/colors.ts";

function TeamCard() {
    return (
        <View style={styles.teamCardContainer}>
        </View>
    )
}

const styles = StyleSheet.create({
    teamCardContainer: {
        backgroundColor: 'white',
        borderColor: colors.secondary,
        borderWidth: 0.2,
        borderRadius: 10,
        width: 130,
    }
})

export default TeamCard