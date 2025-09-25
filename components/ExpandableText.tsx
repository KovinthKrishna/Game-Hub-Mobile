import { useThemeSetting } from "@/context/ThemeContext";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const ExpandableText = ({ description }: { description?: string }) => {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useThemeSetting();

  if (!description) return null;
  if (description.length <= 300)
    return (
      <Text style={{ color: colors.text, lineHeight: 20 }}>{description}</Text>
    );

  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: colors.text, lineHeight: 20 }}>
        {expanded ? description : description.substring(0, 300) + "..."}
      </Text>
      <Pressable onPress={() => setExpanded((e) => !e)} hitSlop={6}>
        <Text
          style={{
            color: colors.tint,
            fontWeight: "600",
          }}
        >
          {expanded ? "Show Less" : "Read More"}
        </Text>
      </Pressable>
    </View>
  );
};

export default ExpandableText;
