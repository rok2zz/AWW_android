import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import TabHeader from "../../../../../components/header/TabHeader";

import Arrow from "../../../../../assets/imgs/common/chevron_right.svg"
import { version } from "../../../../RootStack";
import { useAuthActions, useSetting } from "../../../../../hooks/useAuth";
import { UserSetting } from '../../../../../slices/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SettingStackNavigationProp } from "../../../../../types/stack";

const Setting = (): JSX.Element => {
    const navigation = useNavigation<SettingStackNavigationProp>();
    const userSetting: UserSetting = useSetting();
    const { saveSetting } = useAuthActions();

    const changeUserSetting = async (type: string, value: number) => {
        let updatedSetting = { ...userSetting };
        switch (type) {
            case 'timeType':
                updatedSetting.timeType = value;
                break;
            case 'type':
                updatedSetting.type = value;
                break;
            default:
                break;
        }

        saveSetting(updatedSetting); 
        await AsyncStorage.setItem('Setting', JSON.stringify(updatedSetting)); 
    }
    
    return (
        <View style={ styles.wrapper }>
            <TabHeader title="설정" type={ 0 } isFocused={ false } before={""} />

            <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
                <View style={ styles.contents }>
                    <View style={ styles.itemContainer }>
                        <Text style={ styles.regularText }>시간 표시</Text>
                        <View style={ styles.rowContainer }>
                            <Pressable style={[ styles.timeBtn, userSetting.timeType === 0 && { backgroundColor: '#468ce6' }]} onPress={ () => changeUserSetting('timeType', 0) }>
                                <Text style={[ styles.regularText, userSetting.timeType === 0 && { color: '#ffffff' }]}>12시간제</Text>
                            </Pressable>
                            <Pressable style={[ styles.timeBtn, { marginLeft: 10 }, userSetting.timeType === 1 && { backgroundColor: '#468ce6' }]} onPress={ () => changeUserSetting('timeType', 1)}>
                                <Text style={[ styles.regularText, userSetting.timeType === 1 && { color: '#ffffff' } ]}>24시간제</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={ styles.itemContainer }>
                        <Text style={ styles.regularText }>시간 표시</Text>
                        <View style={ styles.rowContainer }>
                            <Text style={[ styles.regularText, { fontSize: 16, color: '#999999' }]}>섭씨</Text>
                            <Pressable style={[ styles.metricBtn, userSetting.type === 0 && { backgroundColor: '#468ce6' } ]} onPress={ () => changeUserSetting('type', 0) }>
                                <Text style={[ styles.regularText, userSetting.type === 0 && { color: '#ffffff' } ]}>°C</Text>
                            </Pressable>
                            <Text style={[ styles.regularText, { fontSize: 16, color: '#999999', marginLeft: 10 }]}>화씨</Text>

                            <Pressable style={[ styles.metricBtn, userSetting.type === 1 && { backgroundColor: '#468ce6' } ]} onPress={ () => changeUserSetting('type', 1) }>
                                <Text style={[ styles.regularText, userSetting.type === 1 && { color: '#ffffff' } ]}>°F</Text>
                            </Pressable>
                        </View>
                    </View> 

                    <Pressable style={ styles.itemContainer } onPress={ () => navigation.navigate('Favorite') }>
                        <Text style={ styles.regularText }>즐겨찾기</Text>
                        <Arrow />
                    </Pressable> 

                    <View style={ styles.itemContainer }>
                        <Text style={ styles.regularText }>개인정보처리방침</Text>
                        <Arrow />
                    </View> 

                    <View style={[ styles.itemContainer, { borderBottomWidth: 0 }]}>
                        <Text style={ styles.regularText }>버전 정보</Text>
                        <Text style={[ styles.regularText, { fontSize: 16, color: '#999999' }]}>{ version }</Text>
                    </View> 
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#eff0f2'
    },
    container: {
        paddingTop: 20,
        marginHorizontal: 20
    },
    contents: {
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: 15,

        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingVertical: 20,

        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666'
    },
    timeBtn: {
        paddingVertical: 7,
        paddingHorizontal: 19,

        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    },
    metricBtn: {
        paddingVertical: 7,
        paddingHorizontal: 12,
        marginLeft: 5,

        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    }
})

export default Setting;