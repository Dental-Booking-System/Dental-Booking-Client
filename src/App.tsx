import React, {useCallback, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./navigation/TabNavigation.tsx";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet from "./components/BottomSheet.tsx";
import {Dimensions, Pressable, StyleSheet, Text} from "react-native";
import Appointment from "./screens/Appointment.tsx";
import Animated, {
    FadeIn,
    FadeOut, runOnJS,
    useAnimatedStyle, useSharedValue, withSpring, withTiming
} from "react-native-reanimated";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from './redux/store.ts';
import Login from "./screens/Login.tsx";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { height: screenHeight } = Dimensions.get('window');

function App(): React.JSX.Element {
    const offset = useSharedValue(0);
    const [isSheetOpen, setSheetOpen] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const toggleSheet = () => {
        offset.value = 0;
        setSheetOpen(!isSheetOpen);
    };

    const pan = Gesture.Pan()
        .onChange( event => {
            const offsetDelta = event.changeY + offset.value;
            const clamp = Math.max(-20, offsetDelta);
            offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
        })
        .onFinalize(() => {
            if (offset.value < screenHeight / 3) {
                offset.value = withTiming(0)
            } else {
                offset.value = withTiming(screenHeight, {}, () => {
                    runOnJS(toggleSheet)();
                })
            }

        })

    const translateY = useAnimatedStyle(() => ({
        transform: [{translateY: offset.value}]
    }));

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer >
                {isLoggedIn ?
                    <>
                        <TabNavigation toggleSheet={toggleSheet}/>
                        {isSheetOpen ? (
                            <>
                                <AnimatedPressable
                                    style={styles.backdrop}
                                    entering={FadeIn}
                                    exiting={FadeOut}
                                    onPress={toggleSheet}
                                />
                                <BottomSheet content={
                                    <Appointment
                                        toggleSheet={toggleSheet}
                                    />
                                }
                                             style={translateY}
                                             gesture={pan}
                                             toggleSheet={toggleSheet}
                                />
                            </>

                        ): null}
                    </>
                    :
                    <Login />
                }
                </NavigationContainer>
            </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default App;
