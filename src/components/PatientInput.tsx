import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {memo, useEffect, useState} from "react";
import {colors} from "../theme/colors.ts";
import DatePicker from "react-native-date-picker";
import PhoneInput from "react-native-phone-input";

type Props = {
    open: boolean;
    handleSetOpen: (open: boolean) => void;
    birthDate: Date
    handleSetBirthDate: (date: Date) => void;
    name: string;
    handleSetName: (name: string) => void;
    phone: string;
    handleSetPhone: (phone: string) => void;
    genderArray: { gender: string, isSelected: boolean }[]
    handleSetGenderArray: (updatedArray: any) => void;
    info: string;
    handleSetAdditionalInfo: (info: string) => void;
}

const PatientInput = memo(function PatientInput(props: Props) {
    const genders = ["Nam", "Nữ", "Khác"]

    const handleGenderPress = (gender: string) => {
        const updatedGenderArray = props.genderArray.map((item: any) => {
            if (gender === item.gender) return {
                gender: item.gender,
                isSelected: true
            }
            return {
                gender: item.gender,
                isSelected: false
            }
        });
        props.handleSetGenderArray(updatedGenderArray);
    }

    useEffect(() => {
        let updatedGenderArray: { gender: string, isSelected: boolean }[] = [];
        genders.forEach(gender => {
            updatedGenderArray.push({
                gender: gender,
                isSelected: false
            });
        });
        props.handleSetGenderArray(updatedGenderArray);
    }, []);

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <View style={styles.patientInputContainer}>
            <Text
                style={styles.patientTitleLabel}
            >
                Thông tin bệnh nhân
            </Text>
            <View style={styles.fieldInputContainer}>
                <Text
                    style={styles.labelInput}
                >Họ và tên</Text>
                <TextInput
                    editable
                    maxLength={35}
                    onChangeText={(text) => {
                        props.handleSetName(text);
                    }}
                    value={props.name}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.fieldInputContainer}>
                <Text
                    style={styles.labelInput}
                >Số điện thoại</Text>
                <PhoneInput
                    // @ts-ignore
                    value={props.phone}
                    initialCountry={'vn'}
                    onChangePhoneNumber={(phone: string) => props.handleSetPhone(phone)}
                    style={[styles.textInput, {

                    }]}
                    textStyle={styles.textInput}
                />
            </View>
            <View style={styles.fieldInputContainer}>
                <Text
                    style={styles.labelInput}
                >
                    Ngày sinh
                </Text>
                <View >
                    <TouchableOpacity
                        onPress={() => props.handleSetOpen(true)}
                        style={styles.textInput}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontFamily: "Helvetica Neue",
                            color: '#2c2c2c',
                        }}>
                            {` ${props.birthDate.getDate()}/${props.birthDate.getMonth() + 1}/${props.birthDate.getFullYear()}`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={props.open}
                    date={props.birthDate}
                    mode={"date"}
                    onConfirm={(date) => {
                        props.handleSetOpen(false);
                        props.handleSetBirthDate(date);
                    }}
                    onCancel={() => {
                        props.handleSetOpen(false);
                    }}
                />
            </View>

            <View style={styles.fieldInputContainer}>
                <Text
                    style={styles.labelInput}
                >Giới tính</Text>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    gap: 8
                }}>
                    {props.genderArray.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleGenderPress(item.gender)}
                                style={[
                                    styles.genderInputContainer,
                                    {
                                        backgroundColor: item.isSelected ? colors.primary : "white"
                                    }
                                ]}
                            >
                                <Text style={[styles.genderText, {color: item.isSelected ? "white" : colors.grey}]}>
                                    {item.gender}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={[styles.fieldInputContainer, {
                height: 141,
            }]}>
                <Text
                    style={[styles.labelInput,{
                        width: 500,
                    }]}
                >Những gì chúng tôi cần biết thêm</Text>
                <TextInput
                    editable
                    maxLength={35}
                    onChangeText={ (text) => {
                        props.handleSetAdditionalInfo(text);
                    }}
                    value={props.info}
                    style={[styles.textInput,{
                        height: 100,

                    }]}
                />
            </View>



        </View>
    )
})

const styles = StyleSheet.create({
    patientInputContainer: {
        gap: 12,
        paddingTop: '5%'
    },
    patientTitleLabel: {
        fontFamily: "Helvetica",
        fontSize: 23,
        paddingHorizontal: "2%",
        fontWeight: "bold",
    },
    fieldInputContainer: {
        height: 75,
        width: '100%'
    },
    labelInput: {
        flex: 1,
        fontFamily: "Helvetica",
        fontSize: 18,
        paddingHorizontal: "2%",
        color: colors.grey,
    },
    textInput: {
        borderWidth: 0,
        backgroundColor: colors.textInputBackgroundColor,
        borderRadius: 10,
        height: 40,
        borderColor: colors.third,
        fontFamily: 'Helvetica Neue',
        padding: 10,
        color: '#2c2c2c',
        fontSize: 18
    },
    submitButtonContainer: {
        borderWidth: 1,
        borderColor: 'red'
    },
    genderInputContainer: {
        borderWidth: 0.5,
        width: 78,
        borderRadius: 8,
        borderColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center"
    },
    genderText: {
        fontFamily: "Helvetica Neue",
        fontSize: 15,
        color: colors.grey,
        fontWeight: "500",
        fontStyle: "italic"
    }


})

export default PatientInput;

