import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../screens/Home.tsx";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import homeLogo from '../assets/TabNavigationIcons/homeLogo.svg';
import documentLogo from '../assets/TabNavigationIcons/documentLogo.svg';
import calendarLogo from '../assets/TabNavigationIcons/calendarLogo.svg';
import priceLogo from '../assets/TabNavigationIcons/priceLogo.svg';
import accountLogo from '../assets/TabNavigationIcons/accountLogo.svg';
import {colors} from "../theme/colors.ts";
import React, {memo, useState} from "react";

const Tab = createBottomTabNavigator();

type Props = {
    toggleSheet: () => void;
}

const TabNavigation = memo(function TabNavigation(props: Props) {

    return (
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                height: 85,
                borderRadius: 25,
                ...styles.shadow
            },
            tabBarIcon: ({ focused, color, size }) => {
                let IconComponent;
                let IconLabel;
                let labelColor = '#B4B4B4';
                let width = 36, height = 36;
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
                        labelColor = colors.primary;
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

                if (IconComponent != calendarLogo && focused) labelColor = colors.primary;
                return (
                    IconComponent == calendarLogo ?
                        <View style={styles.calendarLabelContainer}>
                            <TouchableOpacity onPress={props.toggleSheet}>
                                <View style={styles.calendarBackground}>
                                    {IconComponent ? <IconComponent width={40} height={40} fill={color}/> : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={{...styles.calendarTabLabel, color: labelColor}}>{IconLabel}</Text>
                        </View> :
                        <View style={styles.tabContainer}>
                            {IconComponent ? <IconComponent width={width} height={height} fill={color}/> : null}
                            <Text style={{...styles.tabLabel, color: labelColor}}>{IconLabel}</Text>
                        </View>
                )
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#B4B4B4',
            tabBarShowLabel: false,
        })}
      >
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Document" component={Home}/>
          <Tab.Screen
              listeners={{
                  tabPress: e => {
                      e.preventDefault();
                  }
              }}
              name="Calendar"
              component={Home}/>
          <Tab.Screen name="Price" component={Home}/>
          <Tab.Screen name="Account" component={Home}/>
      </Tab.Navigator>
    );
});

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 5
    },

    tabLabel: {
        fontSize: 13.5,
        fontFamily: 'Helvetica Neue',
    },

    tabContainer: {
        alignItems: 'center',
        paddingTop: 15,
        gap: 1,
    },

    calendarLabelContainer: {
        borderRadius: 60,
        alignItems: 'center',
        paddingBottom: 15
    },

    calendarBackground: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    },

    calendarTabLabel: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        paddingTop: 7
    },
})

export default TabNavigation;