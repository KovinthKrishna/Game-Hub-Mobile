import { useThemeSetting } from "@/context/ThemeContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { colors } = useThemeSetting();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.tint} />
    </View>
  );
}
