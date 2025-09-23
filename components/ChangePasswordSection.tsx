import { useAuth } from "@/context/AuthContext";
import { useThemeSetting } from "@/context/ThemeContext";
import { useState } from "react";
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

const ChangePasswordSection = ({ styles }: { styles: Styles }) => {
  const { colors } = useThemeSetting();
  const { changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordUpdating, setPasswordUpdating] = useState(false);

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const onChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword)
      return Alert.alert("Validation", "All password fields required");
    if (newPassword !== confirmNewPassword)
      return Alert.alert("Validation", "New passwords do not match");
    if (newPassword.length < 8)
      return Alert.alert(
        "Validation",
        "New password should be at least 8 characters"
      );
    if (newPassword === currentPassword)
      return Alert.alert(
        "Validation",
        "New password must be different from current password"
      );
    try {
      setPasswordUpdating(true);
      await changePassword(currentPassword, newPassword);
      resetPasswordFields();
      Alert.alert("Success", "Password changed successfully");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to change password");
    } finally {
      setPasswordUpdating(false);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Change Password</Text>
      <View style={{ gap: 8 }}>
        <Text style={styles.labelStyle}>Current Password</Text>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current password"
          placeholderTextColor={colors.text + "88"}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.labelStyle}>New Password</Text>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New password"
          placeholderTextColor={colors.text + "88"}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.labelStyle}>Confirm New Password</Text>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirm new password"
          placeholderTextColor={colors.text + "88"}
        />
      </View>
      <Pressable
        disabled={passwordUpdating}
        onPress={onChangePassword}
        style={styles.primaryButton(passwordUpdating)}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {passwordUpdating ? "Updating..." : "Change Password"}
        </Text>
      </Pressable>
    </View>
  );
};

export default ChangePasswordSection;
