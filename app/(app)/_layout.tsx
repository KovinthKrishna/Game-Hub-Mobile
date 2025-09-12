import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useThemeSetting } from "../../context/ThemeContext";

export default function AppTabsLayout() {
  const { colors, colorScheme } = useThemeSetting();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.card },
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.text + "88",
        tabBarLabelStyle: { fontSize: 12 },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
