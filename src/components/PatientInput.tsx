import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {memo, useEffect, useState} from "react";
import {colors} from "../theme/colors.ts";
import DatePicker from "react-native-date-picker";
import PhoneInput from "react-native-phone-input";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {onChangeBirthDate, onChangeGender, onChangeName, onChangePhone} from "../redux/patientSlice.ts";
import auth from "@react-native-firebase/auth";

const PatientInput = memo(function PatientInput() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const name = useSelector((state: RootState) => state.patient.name);
    const phone = useSelector((state: RootState) => state.patient.phone);
    const birthDate = useSelector((state: RootState) => state.patient.birthDate);
    const gender = useSelector((state: RootState) => state.patient.gender);
    const additionalInfo = useSelector((state: RootState) => state.appointment.additionalInfo);
    const [birthDateState, setBirthDateState] = useState(birthDate == "" ? new Date() : new Date(birthDate));
    const genders = ["Nam", "Nữ", "Khác"]
    const [genderArray, setGenderArray] = useState<{gender: string, isSelected: boolean}[]>([]);

    const handleGenderPress = (gender: string) => {
        const updatedGenderArray = genderArray.map((item: any) => {
            if (gender === item.gender) return {
                gender: item.gender,
                isSelected: true
            }
            return {
                gender: item.gender,
                isSelected: false
            }
        });
        dispatch(onChangeGender(gender));
        setGenderArray(updatedGenderArray);
    }

    useEffect(() => {
        let updatedGenderArray: { gender: string, isSelected: boolean }[] = [];
        genders.forEach(genderString => {
            updatedGenderArray.push({
                gender: genderString,
                isSelected: genderString == gender
            });
        });
        setGenderArray(updatedGenderArray);
    }, []);

    useEffect(() => {
        const uid = auth().currentUser?.uid;
        auth().currentUser?.getIdToken().then(token => {
            fetch(`${process.env.BASE_URL}/api/patients/${uid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(patient => {
                    if (name == "" && patient.name != null) dispatch(onChangeName(patient.name))
                    if (phone == "" && patient.phone != null) dispatch(onChangeGender(patient.phone))
                })
        }).catch(err => {
            console.log(err)
        })
    }, []);

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
                        dispatch(onChangeName(text));
                    }}
                    value={name}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.fieldInputContainer}>
                <Text
                    style={styles.labelInput}
                >Số điện thoại</Text>
                <PhoneInput
                    initialValue= {phone == "" ? "84": phone}
                    initialCountry={'vn'}
                    onChangePhoneNumber={(phone: string) => dispatch(onChangePhone(phone))}
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
                        onPress={() => setOpen(true)}
                        style={styles.textInput}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontFamily: "Helvetica Neue",
                            color: '#2c2c2c',
                        }}>
                            {birthDate != "" && ` ${birthDateState.getDate()}/${birthDateState.getMonth() + 1}/${birthDateState.getFullYear()}`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={birthDateState}
                    mode={"date"}
                    onConfirm={(date) => {
                        setOpen(false);
                        dispatch(onChangeBirthDate(date.toISOString()));
                        setBirthDateState(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
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
                    {genderArray.map((item, index) => {
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

