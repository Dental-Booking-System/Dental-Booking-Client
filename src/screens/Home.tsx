import {
    View,
    StyleSheet, Text,
} from 'react-native';
import Hero from "../components/banners/Hero.tsx"
import ServicesContainer from "../components/banners/ServicesContainer.tsx";
import Team from "../components/banners/Team.tsx";
import {colors} from "../theme/colors.ts";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

function Home() {
    return (
        // <View style={styles.homeContainer}>
        //     {/*<Hero ></Hero>*/}
        //     {/*<ServicesContainer />*/}
        //     {/*<ScrollView*/}
        //     {/*    style={styles.scrollViewContainer}*/}
        //     {/*    contentContainerStyle={styles.scrollViewContentContainer}*/}
        //     {/*>*/}
        //     {/*    <Team />*/}
        //     {/*</ScrollView>*/}
        //     {/*<View style={styles.backgroundHero}></View>*/}
        //
        // </View>
        // <SafeAreaView
        //     style={{
        //         borderColor: 'pink',
        //         borderWidth: 5,
        //         flex: 1,
        //         backgroundColor: 'red'
        //     }}
        // >
        //     {/*<Hero />*/}
        // </SafeAreaView>
        <Text>Hello</Text>

    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'red'
    },

    backgroundHero: {
        borderWidth: 1,
        height: '35%',
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },

    scrollViewContainer: {
        bottom: '15.7%',
        height: '50%'
    },

    scrollViewContentContainer: {
        gap: 15
    },
})

export default Home;