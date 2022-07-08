import { useEffect, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { renderCandidate } from "../components/atoms/article";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { get } from "../utils/http";

import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../utils/constants";

export function Candidates({ navigation }) {
	const [candidates, setCandidates] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	async function getCandidates() {
		setIsFetching(true);
		let response = await get("api/v1/candidates");

		setCandidates(response.data.data.reverse(0));
		setIsFetching(false);
	}

	useEffect(() => {
		getCandidates();
	}, []);

	return (
		<Screen>
			<View
				style={{
					flex: 1,
					flexGrow: 1,
				}}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<FlatList
						refreshing={isFetching}
						style={{ height: 40 }}
						showsVerticalScrollIndicator={false}
						data={candidates}
						renderItem={renderCandidate(navigation)}
						onRefresh={getCandidates}
						ListFooterComponent={() => (
							<View
								style={{
									height: 70,
									justifyContent: "center",
								}}
							>
								<Text align="center">No more candidates</Text>
							</View>
						)}
					/>
				</View>
			</View>
			{/* <View
				style={{
					backgroundColor: Colors.primary,
					width: 50,
					height: 50,
					borderRadius: 25,
					position: "absolute",
					bottom: 20,
					right: 0,
					zIndex: 1,
				}}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("NewArticle");
					}}
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						elevation: 10,
					}}
				>
					<MaterialIcons name="add" size={30} color="white" />
				</TouchableOpacity>
			</View> */}
		</Screen>
	);
}
