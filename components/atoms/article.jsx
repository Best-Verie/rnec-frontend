import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils/constants";
import Text from "../theme/text";

export function renderCandidate(navigation) {
	return function ({ item, index, separators }) {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("CandidateDetails", {
						item,
					});
				}}
			>
				<View
					style={{
						borderBottomColor: "#eee",
						borderBottomWidth: 1,
						paddingVertical: 20,
					}}
				>
					<Text bold>{item.names}</Text>
					<Text
						styles={{
							marginTop: 20,
						}}
					>
						{item.missionStatement}
					</Text>
					<Text
						size={15}
						medium
						color={Colors.primary}
						style={{
							marginTop: 20,
						}}
					>
						votes:  {item.votes}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
}
