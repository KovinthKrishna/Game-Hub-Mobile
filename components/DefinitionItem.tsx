import { useThemeSetting } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

const DefinitionItem = ({ term, children }: Props) => {
  const { colors } = useThemeSetting();
  return (
    <View style={{ marginVertical: 8, flexBasis: "48%" }}>
      <Text
        style={{
          color: colors.text,
          fontWeight: "600",
          marginBottom: 4,
        }}
      >
        {term}
      </Text>
      <View>{children}</View>
    </View>
  );
};

export default DefinitionItem;
