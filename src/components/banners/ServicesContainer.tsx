import {Animated, StyleSheet, ScrollView, Text, View, FlatList} from "react-native";
import ServiceCard from "../cards/ServiceCard.tsx";

function ServiceColumn() {
    return (
        <View style={styles.serviceColumnContainer}>
            <ServiceCard />
            <ServiceCard />
        </View>
    )
}

function ServicesContainer() {
    return (
        <View style={styles.servicesContainer}>
            <ScrollView
                horizontal={true}
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <ServiceColumn />
                <ServiceColumn />
                <ServiceColumn />
                <ServiceColumn />
                <ServiceColumn />
                <ServiceColumn />
                <ServiceColumn />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
    },

    scrollViewContentContainer: {
        gap: 10
    },

    servicesContainer: {
        marginHorizontal: '3%',
        flexDirection: 'row',
        paddingHorizontal: '3.5%',
        paddingVertical: '2%',
        justifyContent: 'space-between',
        height: '27%',
        bottom: '38.5%',
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 5,
    },

    serviceColumnContainer: {
        width: 85,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
});

export default ServicesContainer;