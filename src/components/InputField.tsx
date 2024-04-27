import {View} from "react-native";

type Props = {
    inputType: any,
    placeholder: string
}

function InputField(props: Props) {
    return (
        <View>
            <InputField inputType={props.inputType} placeholder={props.placeholder} />
        </View>
    )
}