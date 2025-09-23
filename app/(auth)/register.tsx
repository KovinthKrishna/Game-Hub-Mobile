import getAuthStyles from "@/styles/authStyles";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import { useThemeSetting } from "../../context/ThemeContext";

export default function RegisterScreen() {
  const { register } = useAuth();
  const { colors } = useThemeSetting();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = getAuthStyles(colors, loading);

  const onSubmit = async () => {
    if (!firstName || !lastName || !email || !password)
      return Alert.alert("Error", "All fields are required");
    if (password !== confirm)
      return Alert.alert("Error", "Passwords do not match");
    if (password.length < 8)
      return Alert.alert("Error", "Password should be at least 8 characters");
    setLoading(true);
    try {
      await register(firstName.trim(), lastName.trim(), email.trim(), password);
    } catch (e: any) {
      Alert.alert("Registration failed", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="First Name"
        placeholderTextColor={colors.text + "88"}
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor={colors.text + "88"}
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.text + "88"}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.text + "88"}
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={colors.text + "88"}
        secureTextEntry
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
      />
      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={styles.buttonContainer}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </Pressable>
      <Link href="/login" asChild>
        <Text style={styles.linkText}>Have an account? Login</Text>
      </Link>
      <ThemeToggle />
    </View>
  );
}
