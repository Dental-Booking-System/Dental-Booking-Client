import {ScrollView, StyleSheet, Text, View} from "react-native";
import TeamCard from "../cards/TeamCard.tsx";


function Team() {
    return (
        <View style={styles.teamContainer}>
            <Text style={styles.teamTitle}>
                Đội ngũ nha khoa
            </Text>
            <ScrollView
                horizontal={true}
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <TeamCard />
                <TeamCard />
                <TeamCard />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    teamContainer: {
        flexDirection: 'column',
        paddingHorizontal: '4%',
        gap: 15
    },

    teamTitle: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 22,
        paddingHorizontal: '1%'
    },

    scrollViewContainer: {
        flex: 1,
        height: 160,
        paddingBottom: '3%'
    },

    scrollViewContentContainer: {
        gap: 15
    }
})

export default Team;