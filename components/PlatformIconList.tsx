import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View } from "react-native";

interface Props {
  platforms: Platform[];
  color: string;
  size?: number;
  gap?: number;
}

const PlatformIconList = ({ platforms, color, size = 18, gap = 6 }: Props) => {
  const icons: Record<string, React.ComponentType<any>> = {
    pc: FontAwesome5,
    playstation: FontAwesome5,
    xbox: FontAwesome5,
    nintendo: MaterialCommunityIcons,
    mac: Ionicons,
    linux: FontAwesome5,
    ios: MaterialCommunityIcons,
    web: MaterialCommunityIcons,
    android: Ionicons,
  };

  const names: Record<string, string> = {
    pc: "windows",
    playstation: "playstation",
    xbox: "xbox",
    nintendo: "nintendo-switch",
    mac: "logo-apple",
    linux: "linux",
    ios: "apple-ios",
    web: "web",
    android: "logo-android",
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap }}>
      {platforms?.map((p) => {
        const IconComp = icons[p.slug];
        const name = names[p.slug];
        if (!IconComp || !name) return null;
        return (
          <IconComp key={p.id} name={name as any} size={size} color={color} />
        );
      })}
    </View>
  );
};

export default PlatformIconList;
