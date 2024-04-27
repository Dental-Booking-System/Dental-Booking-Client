import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./navigation/TabNavigation.tsx";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet from "./components/BottomSheet.tsx";
import {Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import Appointment from "./screens/Appointment.tsx";
import Animated, {
    clamp,
    ExitAnimationsValues,
    FadeIn,
    FadeOut, runOnJS,
    SlideInDown,
    SlideOutDown,
    SlideOutLeft,
    SlideOutRight, useAnimatedStyle, useSharedValue, withClamp, withDelay, withSpring, withTiming
} from "react-native-reanimated";
import {
    SafeAreaView
} from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { height: screenHeight } = Dimensions.get('window');

function App(): React.JSX.Element {
    const offset = useSharedValue(0);
    const [isOpen, setOpen] = useState(false);

    const toggleSheet = () => {
        setOpen(!isOpen);
        offset.value = 0;
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
        // <GestureHandlerRootView style={{flex: 1}}>
        //     <NavigationContainer >
        //         <TabNavigation toggleSheet={toggleSheet}/>
        //         {isOpen && (
        //             <>
        //                 <AnimatedPressable
        //                     style={styles.backdrop}
        //                     entering={FadeIn}
        //                     exiting={FadeOut}
        //                     onPress={toggleSheet}
        //                 />
        //                 <BottomSheet content={<Appointment toggleSheet={toggleSheet}/>} style={translateY} gesture={pan}/>
        //             </>
        //         )}
        //     </NavigationContainer>
        // </GestureHandlerRootView>
        <SafeAreaView
            style={{
                borderWidth: 3,
                borderColor: 'red',
                flex: 1,
                backgroundColor: 'blue'
            }}
        >
            <View>
                <Text>
                    Hello
                    
                </Text>
            </View>

        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default App;
