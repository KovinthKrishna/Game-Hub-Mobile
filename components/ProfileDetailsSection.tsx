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
  outlineButton: ViewStyle;
}

const ProfileDetailsSection = ({ styles }: { styles: Styles }) => {
  const { colors } = useThemeSetting();
  const { userDetails, updateProfileDetails } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName || "");
      setLastName(userDetails.lastName || "");
    }
  }, [userDetails]);

  const onSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      return Alert.alert("Validation", "First and last name cannot be empty");
    }
    if (
      firstName.trim() === userDetails?.firstName &&
      lastName.trim() === userDetails?.lastName
    ) {
      return Alert.alert(
        "Validation",
        "No changes detected in profile details"
      );
    }
    try {
      setProfileSaving(true);
      await updateProfileDetails(firstName.trim(), lastName.trim());
      setEditingProfile(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Profile Details</Text>
      <View style={{ gap: 8 }}>
        <Text style={styles.labelStyle}>First Name</Text>
        <TextInput
          style={[styles.inputStyle, { opacity: editingProfile ? 1 : 0.8 }]}
          value={firstName}
          onChangeText={setFirstName}
          editable={editingProfile}
          placeholder="First name"
          placeholderTextColor={colors.text + "88"}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.labelStyle}>Last Name</Text>
        <TextInput
          style={[styles.inputStyle, { opacity: editingProfile ? 1 : 0.8 }]}
          value={lastName}
          onChangeText={setLastName}
          editable={editingProfile}
          placeholder="Last name"
          placeholderTextColor={colors.text + "88"}
        />
      </View>
      {!editingProfile && (
        <Pressable
          onPress={() => setEditingProfile(true)}
          style={styles.primaryButton()}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            Edit Profile
          </Text>
        </Pressable>
      )}
      {editingProfile && (
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={() => {
              setEditingProfile(false);
              setFirstName(userDetails?.firstName || "");
              setLastName(userDetails?.lastName || "");
            }}
            style={[styles.outlineButton, { flex: 1 }]}
          >
            <Text style={{ color: colors.tint, fontWeight: "600" }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            disabled={profileSaving}
            onPress={onSaveProfile}
            style={[styles.primaryButton(profileSaving), { flex: 1 }]}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {profileSaving ? "Saving..." : "Save Changes"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ProfileDetailsSection;
