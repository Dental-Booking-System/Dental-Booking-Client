import {StyleSheet, Text, View} from "react-native";
import React, {memo, useEffect, useState} from "react";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {onChangeService} from "../redux/appointmentSlice.ts";



const ServiceInput = memo(function ServiceInput() {
    const service = useSelector((state: RootState) => state.appointment.service);
    const dispatch = useDispatch();

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
                setSelected={(val: string) => {
                    if (val == '0') dispatch(onChangeService(service))
                    else dispatch(onChangeService(val))
                }}
                data={services}
                save="value"
                fontFamily={"Helvetica Neue"}
                defaultOption={{key: '0', value: service}}
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
