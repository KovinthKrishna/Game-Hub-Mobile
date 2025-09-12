import ThemeToggle from "@/components/ThemeToggle";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useThemeSetting } from "../../context/ThemeContext";

export default function ProfileScreen() {
  const { colors } = useThemeSetting();
  const { user, logout } = useAuth();

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.text }}>Profile (empty)</Text>
        <Text style={{ color: colors.text, fontSize: 12 }}>{user?.email}</Text>
        <Pressable
          onPress={logout}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: colors.tint,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </Pressable>
      </View>
      <ThemeToggle />
    </>
  );
}
