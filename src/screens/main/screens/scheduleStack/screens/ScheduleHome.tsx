import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScheduleNavigationProp } from '../../../../../types/stack';


const ScheduleHome = (): React.JSX.Element => {
    const navigation = useNavigation<ScheduleNavigationProp>()

	return (
		<View>
			<Pressable style={ styles.button } onPress={ () => navigation.navigate('ScheduleSetting') }>
				<Text style={ styles.buttonText }>일정 생성</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	
	},
	button: {
		alignItems: 'center',

		padding: 20,
		margin: 20,

		borderRadius: 10,
		backgroundColor: 'orange',
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold'
	}
})

export default ScheduleHome;
