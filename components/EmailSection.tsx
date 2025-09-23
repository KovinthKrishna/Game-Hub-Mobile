import { useAuth } from "@/context/AuthContext";
import { useThemeSetting } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface Styles {
  sectionContainer: ViewStyle;
  sectionTitle: TextStyle;
  labelStyle: TextStyle;
  inputStyle: TextStyle & ViewStyle;
  primaryButton: (disabled?: boolean) => ViewStyle;
}

const EmailSection = ({ styles }: { styles: Styles }) => {
  const { colors } = useThemeSetting();
  const { user, changeEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");
  const [emailUpdating, setEmailUpdating] = useState(false);

  useEffect(() => {
    if (user) setEmail(user.email || "");
  }, [user]);

  const onUpdateEmail = async () => {
    if (!email || !currentPasswordForEmail)
      return Alert.alert("Validation", "Email and current password required");
    if (email === user?.email)
      return Alert.alert("Validation", "New email must be different");
    try {
      setEmailUpdating(true);
      await changeEmail(email.trim(), currentPasswordForEmail);
      setCurrentPasswordForEmail("");
      Alert.alert("Success", "Email changed successfully");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to change email");
    } finally {
      setEmailUpdating(false);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Email</Text>
      <View style={{ gap: 8 }}>
        <Text style={styles.labelStyle}>Email Address</Text>
        <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.text + "88"}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.labelStyle}>Current Password</Text>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          value={currentPasswordForEmail}
          onChangeText={setCurrentPasswordForEmail}
          placeholder="Current password"
          placeholderTextColor={colors.text + "88"}
        />
      </View>
      <Pressable
        disabled={emailUpdating}
        onPress={onUpdateEmail}
        style={styles.primaryButton(emailUpdating)}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {emailUpdating ? "Updating..." : "Change Email"}
        </Text>
      </Pressable>
    </View>
  );
};

export default EmailSection;
