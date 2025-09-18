import bullsEye from "@/assets/images/bulls-eye.webp";
import meh from "@/assets/images/meh.webp";
import thumbsUp from "@/assets/images/thumbs-up.webp";
import { Image } from "expo-image";

interface Props {
  rating: number;
  size?: number;
}

const Emoji = ({ rating, size = 25 }: Props) => {
  if (rating < 3) return null;

  const map: Record<number, { src: any; size: number; alt: string }> = {
    3: { src: meh, size, alt: "meh" },
    4: { src: thumbsUp, size, alt: "recommended" },
    5: { src: bullsEye, size: Math.round(size * 1.4), alt: "exceptional" },
  };

  const conf = map[rating] ?? map[3];

  return (
    <Image
      source={conf.src}
      accessibilityLabel={conf.alt}
      style={{ width: conf.size, height: conf.size, marginTop: 4 }}
      contentFit="contain"
    />
  );
};

export default Emoji;
