import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import {useState} from "react"
import { Button } from "../components/theme/button";
import { validate } from "../utils/validator";
import { Colors } from "../utils/constants";
import { post } from "../utils/http";
import { Alert, Image, TouchableOpacity, View } from "react-native";

export default function CandidateDetails({ navigation, route }) {
	let item = route.params.item;
    const [voterId, setVoterId] = useState("");
	const [candidate, setCandidate] = useState("");

	async function voteHandler() {
		let data = { voterId, candidate };

		let [passes, info] = validate(data, {
			voterId: "required",
			candidate: "required",
		});
		// setVoterId()
		setCandidate(item._id)

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}
 
		console.log("fb")
	}
	return (
		<Screen>
			<Image
        style={styles.tinyLogo}
        source={uri(item.profileUrl)}
      />
			<Text size={22} bold>
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
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});