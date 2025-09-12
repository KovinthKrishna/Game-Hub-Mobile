import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeSetting } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { top } = useSafeAreaInsets();
  const { setting, cycleSetting, colors } = useThemeSetting();

  return (
    <Pressable
      onPress={cycleSetting}
      style={{
        backgroundColor: colors.card,
        padding: 6,
        borderRadius: 12,
        width: 40,
        position: "absolute",
        top: top + 16,
        right: 24,
      }}
    >
      {setting === "system" ? (
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={28}
          color={colors.text}
        />
      ) : setting === "light" ? (
        <MaterialIcons name="light-mode" size={28} color={colors.text} />
      ) : (
        <MaterialIcons name="dark-mode" size={28} color={colors.text} />
      )}
    </Pressable>
  );
};

export default ThemeToggle;
