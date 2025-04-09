import { TextInput } from "react-native";

export interface Focus {
    ref: React.RefObject<TextInput>,
    isFocused: boolean
}