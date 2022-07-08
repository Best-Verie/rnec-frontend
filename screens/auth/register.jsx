import { useContext, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/theme/button";
import { Input } from "../../components/theme/input";
import Text from "../../components/theme/text";
import { AppContext } from "../../contexts/app-context";
import { Screen } from "../../layouts/screen";
import { Colors } from "../../utils/constants";
import { post } from "../../utils/http";
import { validate } from "../../utils/validator";

export default function RegisterScreen({ navigation }) {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [nationalId, setNationalId] = useState("");
	const [phone, setPhone] = useState("");
	const role = "STANDARD"


	async function register() {
		let data = { name,  email, nationalId, phone,address , role};

		let [passes, info] = validate(data, {
			name: "required",
			email: "required|email",
			nationalId: "required",
			phone: "required",
			address: "required",
		});

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			await post("api/v1/users", data);

			Alert.alert("Success", "Registration Successful");
			navigation.navigate("Login");
		} catch (error) {
			console.log(error.response.data);
			Alert.alert(error.response.data, "User Already Registered");
		}
	}

	return (
		<Screen mt>
			<View
				style={{
					marginTop: 20,
				}}
			>
				<Text size={30} medium align="center" color={Colors.primary}>
					Hello. have an account
				</Text>
			</View>
			<View style={{ marginTop: 30 }}>
				<Input label="name" handler={setName} />
				<Input label="nationalId" handler={setNationalId} />
				<Input label="Email" handler={setEmail} />
				<Input label="Phone" handler={setPhone}  />
				<Input label="Addresss" handler={setAddress}  />

			</View>
			<Button title="Create" onPress={register} />
			<View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					<Text align="center" color={Colors.primary}>
						Already Have an account ?
					</Text>
				</TouchableOpacity>
			</View>
		</Screen>
	);
}
