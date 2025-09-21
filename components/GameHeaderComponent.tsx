import logo from "@/assets/images/logo.webp";
import { useThemeSetting } from "@/context/ThemeContext";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import GenreSelector from "./GenreSelector";
import PlatformSelector from "./PlatformSelector";
import SearchInput from "./SearchInput";
import SortSelector from "./SortSelector";

const GameHeaderComponent = () => {
  const { colors } = useThemeSetting();

  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: "600" }}>
          Welcome!
        </Text>
        <Image source={logo} style={{ width: 48, aspectRatio: 1 / 1 }} />
      </View>
      <GenreSelector />
      <PlatformSelector />
      <SortSelector />
      <SearchInput />
    </View>
  );
};

export default GameHeaderComponent;
