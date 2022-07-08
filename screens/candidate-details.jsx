import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import {useState} from "react"
import { Button } from "../components/theme/button";
import { validate } from "../utils/validator";
import { Colors } from "../utils/constants";
import { put } from "../utils/http";
import { Alert, Image, TouchableOpacity, View , StyleSheet} from "react-native";

export default function CandidateDetails({ navigation, route }) {
	let item = route.params.item;
	const [candidate, setCandidate] = useState("");

	async function voteHandler() {
	try {

			await put(`api/v1/candidates/vote/${item._id}`);
			Alert.alert("Success", "Voting Successful");
			navigation.navigate("Candidates");
		} catch (error) {
			if (error.status == 400) {
				Alert.alert(
					"Bad Request",
					Object.values(error.response.data)[0][0]
				);
			} else {
				Alert.alert("Failed!", "Can't vote Again");
			}
		}	
	}
	return (
		<Screen>
		<Image
          style={{width: '100%', height: '50%'}}
          source={{uri:item.profileUrl}}
      />

			<Text size={22} bold styles={{ marginTop: 20 }}>
				{item.names}
			</Text>
			<Text size={16} styles={{ marginTop: 20 }}>
				NID: {item.nationalId}
			</Text>
			<Text size={16} styles={{ marginTop: 20 }}>
				gender: {item.gender}
			</Text>
			<Text size={16} styles={{ marginTop: 20 }}>
				{item.missionStatement}
			</Text>
			<View styles={{ marginTop: 30 }} >
		   <Button title="Vote" onPress={voteHandler} />

			</View>
		</Screen>
	);
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});