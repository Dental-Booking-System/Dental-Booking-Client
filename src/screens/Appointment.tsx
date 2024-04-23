import {Button, StyleSheet, Text, View} from "react-native";
import BottomSheet, {
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from "react";

function Appointment() {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                {/* INSERT A SCROLLABLE HERE */}
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
});

export default Appointment;