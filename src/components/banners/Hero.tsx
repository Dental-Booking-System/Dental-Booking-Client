import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import HeaderScheduleIcon from "../../assets/headerScheduleIcon.svg";
import {colors} from "../../theme/colors.ts";
import PhoneHeaderIcon from "../../assets/phoneHeaderIcon.svg";
import {normalize} from "../../utilities/scale.tsx";
import {SafeAreaProvider} from "react-native-safe-area-context";

function HeroHeader() {
    let width = 30, height = 30;
    return (
        <View style={styles.heroHeaderContainer}>
            <View style={styles.heroHeaderWord}>
                <Text
                    style={{
                        fontSize: 33,
                        fontFamily: 'Helvetica Neue',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    Nha Khoa 233
                </Text>
            </View>
            <View style={styles.heroHeaderIcon}>
                <View style={styles.heroHeaderIconBackground}>
                    <HeaderScheduleIcon width={width} height={height} fill={colors.primary} />
                </View>
                <View style={styles.heroHeaderIconBackground}>
                    <PhoneHeaderIcon width={width} height={height} fill={colors.primary} />
                </View>
            </View>
        </View>
    )
}

function Hero() {
    return (
        <View style={styles.heroContainer}>
            {/*<HeroHeader />*/}
            {/*<Text style={styles.addressContainer}>*/}
            {/*    233 Nguyễn Thiện Thuật, Phường 1, Quận 3, TP. HCM*/}
            {/*</Text>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    heroContainer: {
        borderWidth: 2,
        flex: 1,
        borderColor: 'green',

    },

    heroHeaderContainer: {
        flexDirection: 'row',
        borderWidth: 1
    },

    heroHeaderWord: {
        flexDirection: 'column',
        flex: 3,
        paddingLeft: '1%',
        paddingTop: '1%'
    },

    heroHeaderIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: '4%',
        gap: 14,
        flex: 1
    },

    heroHeaderIconBackground: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: '7%',
    },

    addressContainer: {
        color: 'white',
        fontSize: 8.8,
        paddingLeft: '6%',
        bottom: '90%'
    }
})

export default Hero;