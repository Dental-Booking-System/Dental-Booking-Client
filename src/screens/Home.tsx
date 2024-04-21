import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    ViewStyle,
    ScrollView
} from 'react-native';
import {colors} from "../theme/colors.ts";
import PhoneHeaderIcon from "../assets/phoneHeaderIcon.svg";
import HeaderScheduleIcon from "../assets/headerScheduleIcon.svg";
import Hero from "../components/banners/Hero.tsx"
import ServicesContainer from "../components/banners/ServicesContainer.tsx";
import Team from "../components/banners/Team.tsx";


function Home() {
    return (
        <View style={styles.homeContainer}>
            <Hero ></Hero>
            <ServicesContainer />
            <ScrollView
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <Team />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: 'white'
    },

    scrollViewContainer: {
        bottom: '15.7%',
        height: '50%'
    },

    scrollViewContentContainer: {
        gap: 15
    }
})

export default Home;