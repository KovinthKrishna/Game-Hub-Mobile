import { useThemeSetting } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
  const { colors } = useThemeSetting();
  const { top } = useSafeAreaInsets();
  const styles = getStyles(colors, top);

  if (error) return null;

  const handleSelectItem = (item: T) => {
    onSelectItem(item.id === 0 ? undefined : item);
    setModalVisible(false);
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>
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
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContent}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.menuItem}
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
          </SafeAreaView>
        </Pressable>
      </Modal>
    </View>
  );
};

const getStyles = (
  colors: {
    background: string;
    text: string;
    card: string;
    border: string;
    tint: string;
  },
  top: number
) =>
  StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      height: 40,
      minWidth: 160,
      paddingHorizontal: 16,
      borderRadius: 8,
      justifyContent: "space-between",
    },
    buttonText: {
      fontSize: 16,
      color: colors.text,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      width: "100%",
      maxHeight: "60%",
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginTop: top + 80,
    },
    menuItem: {
      padding: 12,
      borderBottomWidth: 2,
      borderBottomColor: colors.border,
    },
  });

export default QuerySelector;
