import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeSetting } from "../../context/ThemeContext";

export default function HomeScreen() {
  const { colors } = useThemeSetting();

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 24 }}>Welcome!</Text>
    </SafeAreaView>
  );
}
