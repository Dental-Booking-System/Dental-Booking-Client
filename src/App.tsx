import React, {useCallback, useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./navigation/TabNavigation.tsx";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet from "./components/BottomSheet.tsx";
import {Dimensions, Pressable, StyleSheet, Text} from "react-native";
import Appointment from "./screens/Appointment.tsx";
import Animated, {
    FadeIn,
    FadeOut, runOnJS, SlideInDown, SlideInRight, SlideOutDown,
    useAnimatedStyle, useSharedValue, withSpring, withTiming
} from "react-native-reanimated";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from './redux/store.ts';
import auth from "@react-native-firebase/auth";
import {logIn, logOut} from "./redux/authSlice.ts";
import LoginNavigation from "./navigation/LoginNavigation.tsx";
import {LogBox} from 'react-native';
import {
    SlideInData
} from "react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/web/animation/Slide.web";
import LoginPrompt from "./components/modals/LoginPrompt.tsx";
import ConfirmModal from "./components/modals/ConfirmModal.tsx";
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);


const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { height: screenHeight } = Dimensions.get('window');

function App(): React.JSX.Element | null {
    const [initializing, setInitializing] = useState(true);
    const offset = useSharedValue(0);
    const [isSheetOpen, setSheetOpen] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const toggleSheet = () => {
        if (auth().currentUser) {
            setShowLoginPrompt(false);
            offset.value = 0;
            setSheetOpen(!isSheetOpen);
            return
        }
        setShowLoginPrompt(true);
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

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        if (user){
            fetch("http://localhost:8080/api/patients", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    phone: user.phone,
                    name: user.displayName,
                    email: user.email
                }),
            })
                .then(() => {
                    dispatch(logIn());
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else dispatch(logOut());
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer >
                {isLoggedIn ?
                    <Animated.View
                        style={{
                            flex: 1
                        }}
                        entering={SlideInRight.springify().damping(18)}
                    >
                        <TabNavigation
                            toggleSheet={toggleSheet}
                        />
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
                        <LoginPrompt isVisible={showLoginPrompt} setIsVisible={setShowLoginPrompt} ></LoginPrompt>
                    </Animated.View>
                    :
                    <LoginNavigation />
                }
            </NavigationContainer>
        </GestureHandlerRootView>
    ) ;
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default App;
