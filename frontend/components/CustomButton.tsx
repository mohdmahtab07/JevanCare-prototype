import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "@/constants/colors";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  icon?: string;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  icon,
}: CustomButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.grayLight;
    switch (variant) {
      case "primary":
        return COLORS.primary;
      case "secondary":
        return COLORS.secondary;
      case "outline":
        return "transparent";
      default:
        return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textLight;
    return variant === "outline" ? COLORS.primary : COLORS.white;
  };

  return (
    <TouchableOpacity
      className="py-4 px-6 rounded-lg flex-row items-center justify-center"
      style={{
        backgroundColor: getBackgroundColor(),
        borderWidth: variant === "outline" ? 1 : 0,
        borderColor: COLORS.primary,
      }}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && <Text className="text-xl mr-2">{icon}</Text>}
      <Text
        className="text-base font-semibold"
        style={{ color: getTextColor() }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
