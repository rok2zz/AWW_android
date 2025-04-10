import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Tts from 'react-native-tts';

interface Location {
	lattitude: number,
	longitude: number
}

const Routine = (): React.JSX.Element => {
	
	// const testTTS = () => {
	// 	// Tts.setDefaultLanguage('ko-KR');
	// 	Tts.setDefaultVoice('ko-kr-x-kob-local');

	// 	Tts.speak('안녕하세요 티티에스입니다');
	// }

	const test = async () => {
		console.log("asdfads")
		const res: any = await axios.get(`http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?`
            + `serviceKey=Wx8XXxiOJtKYbQDTZHabjns%2B5%2BDmaGzKFM9yMQORFZOWk2GPcEQco7y6wcO6QorhKVOdYsJisEBmn%2BECzUrs9Q%3D%3D&`
            + `returnType=json&`
            + `tmX=${202504.303319}&`
            + `tmY=${446794.971711}&`
            + `ver=1.1`);
		console.log(res)
	}

	return (
		<View>
			<Pressable style={ styles.button } onPress={ () => test() }>
				<Text>루틴</Text>
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
	} 
})

export default Routine;
