import { FavoritesProvider } from "@/context/FavoritesContext";
import { GameQueryProvider } from "@/context/GameQueryContext";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ThemeProvider, useThemeSetting } from "../context/ThemeContext";

function RootNavigation() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // wait until auth state resolved
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const { colors, colorScheme } = useThemeSetting();

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShown: false,
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <GameQueryProvider>
            <RootNavigation />
          </GameQueryProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
