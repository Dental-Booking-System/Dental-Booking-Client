import {ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CloseIcon from "../assets/closeIcon.svg";
import AppointmentInput from "../components/AppointmentInput.tsx";
import PatientInput from "../components/PatientInput.tsx";
import React, {useState} from "react";
import {colors} from "../theme/colors.ts";
import auth from '@react-native-firebase/auth';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import LoadingModal from "../components/modals/LoadingModal.tsx";
import AlertModal from "../components/modals/AlertModal.tsx";
import CheckIcon from "../assets/checkIcon.svg";
import Animated, {SlideInRight} from "react-native-reanimated";

type Props = {
    toggleSheet: () => void;
}

function Appointment(props: Props) {

    const [showConfirm, setShowConfirm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    /**
     * Appointment Info
     */
    const date = useSelector((state: RootState) => state.appointment.date);
    const time = useSelector((state: RootState) => state.appointment.time);
    const service = useSelector((state: RootState) => state.appointment.service);
    const name = useSelector((state: RootState) => state.patient.name);
    const phone = useSelector((state: RootState) => state.patient.phone);
    const birthDate = useSelector((state: RootState) => state.patient.birthDate);
    const gender = useSelector((state: RootState) => state.patient.gender);
    const additionalInfo = useSelector((state: RootState) => state.appointment.additionalInfo);

    const validateInput = () => {
        if (!date || !time || !service) {
            return ({complete: false, alert: "Xin vui lòng điền thời gian đặt lịch và dịch vụ."});
        }
        if  (!name || !phone || !birthDate || !gender) {
            return ({complete: false, alert: "Xin vui lòng điền đầy đủ thông tin cá nhân."});
        }
        return ({complete: true, alert: "none"});
    }

    /**
     * Submit appointment
     */
     async function submit() {
         const input = validateInput()
         if (!input.complete){
             throw new Error(input.alert)
        }
         const url = `${process.env.BASE_URL}/api/appointments`;
         const appointmentData = {
             patient_uid: auth().currentUser?.uid,
             doctor_id: 1,
             dental_service_id: Number(service.key),
             start: `${date}T${time}`,
         };
         const res = await  fetch(url, {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization' : `Bearer ${await auth().currentUser?.getIdToken()}`
             },
             body: JSON.stringify(appointmentData)
         })
         await new Promise((resolve) => setTimeout(resolve, 1000));
         if (!res.ok) {
             throw new Error("Thời gian này hiện không có."); // Use server message or fallback
         }
    }

    async function handleSubmit() {
         setShowLoading(true);
         try {
             await submit();
             setShowConfirm(true);
         } catch (err) {
             // @ts-ignore
             setAlertText(err.message);
             setShowAlert(true);
         } finally {
             setShowLoading(false);
         }
    }
    return (
        <View style={styles.appointmentContainer}>
            <View style={styles.appointmentHeader}>
                <Text
                    style={{
                        fontSize: 28,
                        fontFamily: "Helvetica Neue",
                        flexWrap: "wrap"
                    }}
                >
                    Đặt lịch hẹn</Text>
                <TouchableOpacity
                    onPress={props.toggleSheet}
                    style={{
                        height: "70%",
                        paddingTop: "2%",
                    }}
                >
                    <CloseIcon width={25} height={25}
                               fill={'#545454'}
                    />
                </TouchableOpacity>
            </View>
            {!showConfirm ?
                <>
                    <ScrollView
                        horizontal={false}
                        style={styles.scrollViewContainer}
                        contentContainerStyle={styles.scrollViewContentContainer}
                    >
                        <AppointmentInput />
                        <PatientInput />
                        <TouchableOpacity
                            onPress={async () => {
                                await handleSubmit();
                            }}
                        >
                            <View style={{
                                backgroundColor: colors.primary,
                                height: 50,
                                borderRadius: 15,
                                width: '85%',
                                alignSelf: "center",
                                marginTop: "10%",
                                justifyContent: "center"
                            }}>
                                <Text style={{
                                    alignSelf: "center",
                                    color: "white",
                                    fontSize: 18,
                                    fontWeight: "400",
                                    fontFamily: "Helvetica Neue",
                                    fontStyle: "italic"
                                }}>
                                    Đặt lịch
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>

                </>
                :
                <Animated.View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    entering={SlideInRight.springify().damping(18)}
                >
                    <View style={{
                        alignItems: 'center',
                        width: '100%',
                        bottom: '20%'
                    }}>
                        <CheckIcon
                            width={150}
                            height={150}
                            fill={'green'}
                        />
                        <View style={{
                            alignItems: 'center',
                            gap: 10
                        }}>
                            <Text style={{
                                fontWeight: '600',
                                fontSize: 20,
                                fontFamily: 'Helvetica Neue'
                            }}>
                                Đặt lịch thành công!
                            </Text>
                            <Text style={{
                                fontWeight: '400',
                                fontSize: 15,
                                fontFamily: 'Helvetica Neue'
                            }}>
                                Chúng tôi đã gửi đơn xác nhận đến email/số điện thoại của bạn.
                                Bạn có thể quản lý lịch hẹn tại đây.
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                borderRadius: 10,
                                height: "15%",
                                width: '45%',
                                justifyContent: "center",
                                backgroundColor: '#09000',
                                marginTop: '10%',
                            }}
                        >
                            <Text style={{
                                alignSelf: "center",
                                fontSize: 15,
                                color: 'white',
                                fontWeight: '600',
                                fontFamily: 'Helvetica Neue'
                            }}>
                                Quản lý lịch hẹn
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            }
            <AlertModal
                isVisible={showAlert}
                setIsVisible={setShowAlert}
                text={alertText}
            />
            <LoadingModal text={"Xử lý lịch hẹn"} isVisible={showLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    appointmentContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: '5%',
        paddingTop: "8%",
        flex: 1,
    },

    appointmentHeader: {
        height: '5%',
        top: '-24.5%',
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        gap: 80,
    },

    scrollViewContainer: {
        // borderWidth: 1,
        height: "90%",
        bottom: "8%",
        flex: 1,
    },

    scrollViewContentContainer: {
        flexGrow: 1,
    },

    nameContainer: {
        borderWidth: 1
    },

    ageContainer: {
        borderWidth: 1
    }
})

export default Appointment;