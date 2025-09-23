import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";

export type ThemeSetting = "light" | "dark" | "system";

interface ThemeContextValue {
  setting: ThemeSetting;
  colorScheme: "light" | "dark";
  setSetting: (value: ThemeSetting) => void;
  cycleSetting: () => void;
  colors: Colors;
}

const STORAGE_KEY = "game-hub-theme";

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

const lightColors = {
  background: "#ffffff",
  text: "#11181C",
  card: "#f2f2f2",
  border: "#d0d5dd",
  tint: "#2563eb",
};

const darkColors = {
  background: "#0f141a",
  text: "#f1f5f9",
  card: "#1e272f",
  border: "#2c3842",
  tint: "#3b82f6",
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [setting, setSetting] = useState<ThemeSetting>("system");
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        setSetting(stored);
      }
    })();
  }, []);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => sub.remove();
  }, []);

  const colorScheme: "light" | "dark" = useMemo(() => {
    if (setting === "system") return systemScheme === "dark" ? "dark" : "light";
    return setting;
  }, [setting, systemScheme]);

  const setSettingPersist = (value: ThemeSetting) => {
    setSetting(value);
    AsyncStorage.setItem(STORAGE_KEY, value).catch(() => {});
  };

  const cycleSetting = () => {
    setSettingPersist(
      setting === "system" ? "light" : setting === "light" ? "dark" : "system"
    );
  };

  const colors = colorScheme === "dark" ? darkColors : lightColors;

  const value: ThemeContextValue = {
    setting,
    colorScheme,
    setSetting: setSettingPersist,
    cycleSetting,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeSetting = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeSetting must be used within ThemeProvider");
  return ctx;
};
