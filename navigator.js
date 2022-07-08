import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";
import { Text, View } from "react-native";
import CandidateDetails from "./screens/candidate-details";
import { Candidates } from "./screens/candidates";
import { Colors } from "./utils/constants";

import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./screens/auth/login";
import RegisterScreen from "./screens/auth/register";
import React, { useContext } from "react";
import { AppContext } from "./contexts/app-context";
import { LoadingScreen } from "./screens/loading";

export const RootNavigator = () => {
	const { isLoggedIn } = useContext(AppContext);

	return <AuthNavigator />;
};

const AuthStack = createStackNavigator();

function AuthNavigator() {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				gestureDirection: "horizontal",
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<AuthStack.Screen name="Loading" component={LoadingScreen} />
			<AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Register" component={RegisterScreen} />
			<AuthStack.Screen
				name="App"
				options={{
					headerLeft: null,
					gestureEnabled: false,
				}}
				component={AppNavigator}
			/>
		</AuthStack.Navigator>
	);
}

const Stack = createStackNavigator();

function AppNavigator({ navigation }) {
	navigation.addListener("beforeRemove", (e) => {
		e.preventDefault();
	});

	return (
		<Stack.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				headerStyle: {
					backgroundColor: Colors.primary,
				},

				headerTitleStyle: {
					color: "white",
					fontFamily: "DMSans_500Medium",
				},

				headerBackImage: () => (
					<Ionicons name="chevron-back" size={24} color="white" />
				),
			}}
		>
			<Stack.Screen
				name="Candidates"
				component={Candidates}
				options={{
					headerLeft: null,
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name="CandidateDetails"
				options={({ route }) => ({
					title: `Candidate ${route.params.item.names}`,
				})}
				component={CandidateDetails}
			/>
		</Stack.Navigator>
	);
}
