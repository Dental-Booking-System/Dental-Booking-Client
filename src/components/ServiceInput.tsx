import {StyleSheet, Text, View} from "react-native";
import React, {memo, useEffect, useState} from "react";
import {SelectList} from "react-native-dropdown-select-list/index";
import {colors} from "../theme/colors.ts";

type Props = {
    handleSetServiceSelected: (service: string) => void;
}

const ServiceInput = memo(function ServiceInput(props: Props) {
    const services = [
        {key: '1', value: 'Trám răng'},
        {key: '2', value: 'Tẩy trắng răng'},
        {key: '3', value: 'Cắm implants'},
        {key: '4', value: 'Nhổ răng'},
        {key: '5', value: 'Cạo vôi răng'},

    ]
    return (
        <View style={styles.serviceInputContainer}>
            <Text style={{
                paddingHorizontal: '2%',
                fontFamily: "Helvetica",
                fontSize: 23,
                fontWeight: "bold",
            }}>
                Dịch vụ
            </Text>
            <SelectList
                setSelected={(val: string) => props.handleSetServiceSelected(val)}
                data={services}
                save="value"
                fontFamily={"Helvetica Neue"}
                placeholder={"Hãy chọn dịch vụ"}
                inputStyles={{
                    fontWeight: "400",
                    fontSize: 16,
                    color: "#2c2c2c"
                }}
                boxStyles={{
                    borderWidth: 0.4,
                }}
                dropdownStyles={{
                    borderWidth: 0.4
                }}
                dropdownTextStyles={{
                    color: "#2c2c2c"
                }}
            />
        </View>
    )
});

const styles = StyleSheet.create({
    serviceInputContainer: {
        gap: 12,
        paddingTop: '3%'
    }
})

export default ServiceInput;
