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

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useThemeSetting();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = getAuthStyles(colors, loading);

  const onSubmit = async () => {
    if (!email || !password)
      return Alert.alert("Error", "Email and password required");
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e: any) {
      Alert.alert("Login failed", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
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
      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={styles.buttonContainer}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Pressable>
      <Link href="/register" asChild>
        <Text style={styles.linkText}>Need an account? Register</Text>
      </Link>
      <ThemeToggle />
    </View>
  );
}
