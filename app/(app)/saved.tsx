import { Text, View } from "react-native";
import { useThemeSetting } from "../../context/ThemeContext";

export default function SavedScreen() {
  const { colors } = useThemeSetting();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ color: colors.text }}>Saved (empty)</Text>
    </View>
  );
}
