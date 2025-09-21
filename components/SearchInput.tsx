import { useGameQuery } from "@/context/GameQueryContext";
import { useThemeSetting } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Pressable,
  TextInput,
  TextInputSubmitEditingEvent,
  View,
} from "react-native";

const SearchInput = () => {
  const [text, setText] = useState("");
  const { colors } = useThemeSetting();
  const { gameQuery, setSearchText } = useGameQuery();

  useEffect(() => {
    setText(gameQuery.searchText || "");
  }, [gameQuery.searchText]);

  const handleSubmit = (event: TextInputSubmitEditingEvent) => {
    setSearchText(event.nativeEvent.text.trim());
  };

  const handleClear = () => {
    setText("");
    if (gameQuery.searchText) setSearchText();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: 8,
        height: 40,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Feather name="search" size={20} color={colors.text + "88"} />
      <TextInput
        value={text}
        onChangeText={setText}
        style={{
          flex: 1,
          marginHorizontal: 8,
          fontSize: 16,
          color: colors.text,
        }}
        placeholder="Search games..."
        placeholderTextColor={colors.text + "88"}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      {text && (
        <Pressable
          onPress={handleClear}
          style={{
            padding: 4,
          }}
        >
          <Feather name="x" size={20} color={colors.text + "88"} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchInput;
