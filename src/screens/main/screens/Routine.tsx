import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Linking, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApi } from '../../../hooks/useApi';
import Geolocation from '@react-native-community/geolocation';
import notifee, { AndroidImportance, IntervalTrigger, TimestampTrigger, TimeUnit, TriggerType } from '@notifee/react-native';

interface Location {
	lattitude: number,
	longitude: number
}

const Routine = (): React.JSX.Element => {
	
	return (
		<View>
			<Pressable style={ styles.button }>
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
	},
	button2: {
		padding: 20,
		backgroundColor: 'green',
	}  
})

export default Routine;
