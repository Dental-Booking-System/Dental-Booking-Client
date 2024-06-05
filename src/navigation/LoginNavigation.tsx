import {StyleSheet} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login.tsx";
import PhoneOTP from "../screens/PhoneOTP.tsx";
import PhoneLogin from "../screens/PhoneLogin.tsx";
import Animated, {SlideInDown, SlideInLeft} from "react-native-reanimated";

const Stack = createNativeStackNavigator();

function LoginNavigation() {
    return (
        <Animated.View
            style={{
                flex: 1
            }}
            entering={SlideInLeft.springify().damping(18)}
        >
            <Stack.Navigator
                initialRouteName={"Login"}
                screenOptions={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTitle: "",
                    headerBackTitle: "Trở lại",
                    headerTransparent: true,
                    headerBackTitleStyle: {
                        fontSize: 18,
                    },
                    headerTintColor:'black'
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
                <Stack.Screen name="PhoneOTP" component={PhoneOTP} />
            </Stack.Navigator>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

});

export default LoginNavigation;