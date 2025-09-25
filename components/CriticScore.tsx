import { Text, View } from "react-native";

interface Props {
  score: number | null | undefined;
}

const CriticScore = ({ score }: Props) => {
  if (typeof score !== "number") return null;

  const color = score > 75 ? "#16a34a" : score > 60 ? "#ca8a04" : "#64748b";
  const bg = score > 75 ? "#dcfce7" : score > 60 ? "#fef9c3" : "#e2e8f0";

  return (
    <View
      style={{
        backgroundColor: bg,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color, fontWeight: "600", fontSize: 14 }}>{score}</Text>
    </View>
  );
};

export default CriticScore;
