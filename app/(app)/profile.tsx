import ChangePasswordSection from "@/components/ChangePasswordSection";
import EmailSection from "@/components/EmailSection";
import ProfileDetailsSection from "@/components/ProfileDetailsSection";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useThemeSetting } from "@/context/ThemeContext";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { top } = useSafeAreaInsets();
  const { colors } = useThemeSetting();
  const { loading, logout } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  const sectionContainer: ViewStyle = {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  };

  const sectionTitle: TextStyle = {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  };

  const labelStyle: TextStyle = {
    color: colors.text,
    fontSize: 14,
    opacity: 0.8,
  };

  const inputStyle: TextStyle & ViewStyle = {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.text,
  };

  const primaryButton = (disabled?: boolean): ViewStyle => ({
    backgroundColor: colors.tint,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    opacity: disabled ? 0.7 : 1,
  });

  const outlineButton: ViewStyle = {
    borderWidth: 1,
    borderColor: colors.tint,
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  };

  const styles = {
    sectionContainer,
    sectionTitle,
    labelStyle,
    inputStyle,
    primaryButton,
    outlineButton,
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingTop: top + 72 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 24,
            paddingBottom: 48,
          }}
        >
          <ProfileDetailsSection styles={styles} />
          <EmailSection styles={styles} />
          <ChangePasswordSection styles={styles} />
          {/* Logout Section */}
          <View style={sectionContainer}>
            <Text style={sectionTitle}>Logout</Text>
            <Pressable
              onPress={() =>
                Alert.alert("Logout", "Are you sure you want to logout?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Logout", style: "destructive", onPress: logout },
                ])
              }
              style={outlineButton}
            >
              <Text style={{ color: colors.tint, fontWeight: "600" }}>
                Logout
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ThemeToggle />
    </>
  );
}
