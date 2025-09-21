import { useThemeSetting } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  FlatList,
  LayoutRectangle,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

interface Props<T> {
  data: T[];
  error?: Error | null;
  placeholder?: string;
  selectedItem?: T;
  onSelectItem: (item?: T) => void;
}

const QuerySelector = <T extends { id: number | string; name: string }>({
  data,
  error,
  placeholder,
  selectedItem,
  onSelectItem,
}: Props<T>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState<LayoutRectangle | null>(
    null
  );
  const buttonRef = useRef<View>(null);
  const { colors } = useThemeSetting();

  if (error) return null;

  const handleSelectItem = (item: T) => {
    onSelectItem(item.id === 0 ? undefined : item);
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    buttonRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setButtonLayout({ x: pageX, y: pageY, width, height });
      setModalVisible(true);
    });
  };

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.card,
          height: 40,
          minWidth: 160,
          paddingHorizontal: 16,
          borderRadius: 8,
          justifyContent: "space-between",
        }}
        ref={buttonRef}
        onPress={handleOpenModal}
        onLayout={(e) => {
          setButtonLayout(e.nativeEvent.layout);
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.text,
          }}
        >
          {selectedItem?.name || placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color={colors.text} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
          }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              position: "absolute",
              top: buttonLayout ? buttonLayout.y + buttonLayout.height + 6 : 0,
              left: buttonLayout ? buttonLayout.x : 0,
              width: buttonLayout ? buttonLayout.width : 0,
              backgroundColor: colors.card,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: colors.border,
              maxHeight: 400,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    padding: 12,
                    borderBottomWidth: 2,
                    borderBottomColor: colors.border,
                  }}
                  onPress={() => handleSelectItem(item)}
                  disabled={
                    (item.id === 0 && !selectedItem) ||
                    item.id === selectedItem?.id
                  }
                >
                  <Text style={{ color: colors.text }}>{item.name}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default QuerySelector;
