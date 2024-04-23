import {StyleSheet, Text, View} from "react-native";
import {colors} from "../../theme/colors.ts";
import AvatarTeamIcon from "../../assets/avatarTeamIcon.svg";

function TeamCard() {
    return (
        <View style={styles.teamCardContainer}>
            <View style={styles.teamCardBodyContainer}>
                <AvatarTeamIcon fill={colors.secondary}/>
                <Text
                    style = {styles.teamCardText}
                >B.S. Tuyết Nhung</Text>
            </View>
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
    },

    teamCardBodyContainer: {
        flexDirection: "column",
        height: "80%",
    },

    teamCardText: {
        fontSize: 12,
        alignSelf: 'center',
        fontWeight: "300",
        fontFamily: 'Helvetica Neue'

    }
})

export default TeamCard