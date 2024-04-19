import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../screens/Home.tsx";
import {StyleSheet, Text, View} from "react-native";
import homeLogo from '../assets/TabNavigationIcons/homeLogo.svg';
import documentLogo from '../assets/TabNavigationIcons/documentLogo.svg';
import calendarLogo from '../assets/TabNavigationIcons/calendarLogo.svg';
import priceLogo from '../assets/TabNavigationIcons/priceLogo.svg';
import accountLogo from '../assets/TabNavigationIcons/accountLogo.svg';

const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                height: 95,
                borderRadius: 25,
                ...styles.shadow
            },
            tabBarIcon: ({ focused, color, size }) => {
                let IconComponent;
                let IconLabel;
                let labelColor = '#B4B4B4';
                let width = 38, height = 38;
                switch (route.name) {
                    case 'Home':
                        IconComponent = homeLogo;
                        IconLabel = 'Trang chủ';
                        break;
                    case 'Document':
                        IconComponent = documentLogo;
                        IconLabel = 'Hồ sơ';
                        break;
                    case 'Calendar':
                        IconComponent = calendarLogo;
                        color = '#FFFF';
                        labelColor = '#FF986C';
                        IconLabel = 'Đặt lịch hẹn';
                        break;
                    case 'Price':
                        IconComponent = priceLogo;
                        IconLabel = 'Bảng giá';
                        break;
                    case 'Account':
                        IconComponent = accountLogo;
                        IconLabel = 'Tài khoản';
                        break;
                    default:
                        break;
                }

                if (IconComponent != calendarLogo && focused) labelColor = '#FF986C';
                return (
                    IconComponent == calendarLogo ?
                        <View style={styles.calendarLabelContainer}>
                            <View style={styles.calendarBackground}>
                                {IconComponent ? <IconComponent width={45} height={45} fill={color}/> : null}
                            </View>
                            <Text style={{...styles.calendarTabLabel, color: labelColor}}>{IconLabel}</Text>
                        </View> :
                        <View style={styles.tabContainer}>
                            {IconComponent ? <IconComponent width={width} height={height} fill={color}/> : null}
                            <Text style={{...styles.tabLabel, color: labelColor}}>{IconLabel}</Text>
                        </View>
                )
            },
            tabBarActiveTintColor: '#FF986C',
            tabBarInactiveTintColor: '#B4B4B4',
            tabBarShowLabel: false,
        })}
      >
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Document" component={Home}/>
          <Tab.Screen name="Calendar" component={Home}/>
          <Tab.Screen name="Price" component={Home}/>
          <Tab.Screen name="Account" component={Home}/>
      </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 100,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },

    tabLabel: {
        fontSize: 12,
        fontFamily: 'Helvetica Neue',
    },

    tabContainer: {
        alignItems: 'center',
        paddingTop: 12,
        gap: 1,
    },

    calendarLabelContainer: {
        borderRadius: 60,
        alignItems: 'center',
        paddingBottom: 15
    },

    calendarBackground: {
        backgroundColor: '#FF986C',
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

    calendarTabLabel: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        paddingTop: 7
    },
})

export default TabNavigation;