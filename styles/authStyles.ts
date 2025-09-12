import { StyleSheet } from "react-native";

const getAuthStyles = (
  colors: {
    background: string;
    text: string;
    card: string;
    border: string;
    tint: string;
  },
  loading: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "600",
      marginBottom: 24,
      color: colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      borderRadius: 10,
      color: colors.text,
      marginBottom: 12,
    },
    buttonContainer: {
      backgroundColor: colors.tint,
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
      opacity: loading ? 0.7 : 1,
      marginBottom: 24,
    },
    buttonText: { color: "white", fontWeight: "600" },
    linkText: { color: colors.tint, textAlign: "center" },
  });

export default getAuthStyles;
