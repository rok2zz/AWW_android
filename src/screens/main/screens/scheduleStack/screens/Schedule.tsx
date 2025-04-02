import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useApi } from '../../../../../hooks/useApi';


const Schedule = (): React.JSX.Element => {
	const { getApi2 } = useApi()

	const getApi = async () => {
		getApi2(1,1)
		
	}
	
	return (
		<View>
			<Pressable style={ styles.button } onPress={ getApi }>
				<Text>스케쥴</Text>
			</Pressable>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	
	},
	button: {
		padding: 20,
		backgroundColor: 'orange',
	},
	button2: {
		padding: 20,
		backgroundColor: 'green',
	}  
})

export default Schedule;
