import React from 'react';
import { Stack } from 'expo-router';

const WalletLayout = () => {
	return (
		<Stack>
			<Stack.Screen name='index' options={{headerShown : false}}/>
			<Stack.Screen name='ChangePassword' options={{headerShown : false}}/>
			<Stack.Screen name='Information' options={{headerShown : false}}/>
		</Stack>
	)
}

export default WalletLayout;