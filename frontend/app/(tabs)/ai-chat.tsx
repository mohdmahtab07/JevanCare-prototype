import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export default function AIChatScreen() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Health Assistant. I can help you understand symptoms and provide health guidance. How are you feeling today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response (replace with actual Gemini API call later)
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    // Simple keyword-based responses (replace with Gemini API)
    if (input.includes("fever") || input.includes("temperature")) {
      return "I understand you're experiencing fever. Here are some steps:\n\n1. Rest and stay hydrated\n2. Take paracetamol if needed\n3. Monitor your temperature\n4. If fever persists for more than 3 days or exceeds 103°F, please consult a doctor immediately.\n\nWould you like me to help you book an appointment?";
    } else if (input.includes("headache") || input.includes("head pain")) {
      return "Headaches can have various causes. Try these remedies:\n\n1. Rest in a quiet, dark room\n2. Apply cold/warm compress\n3. Stay hydrated\n4. Avoid screen time\n\nIf headache is severe or accompanied by vision problems, please seek immediate medical attention.";
    } else if (input.includes("cold") || input.includes("cough")) {
      return "For cold and cough:\n\n1. Drink warm fluids (tea, soup)\n2. Get adequate rest\n3. Use steam inhalation\n4. Gargle with warm salt water\n\nIf symptoms persist beyond 7 days or worsen, consult a doctor.";
    } else if (
      input.includes("book") ||
      input.includes("appointment") ||
      input.includes("doctor")
    ) {
      return "I can help you book an appointment with a doctor! Based on your symptoms, I recommend consulting a General Physician. Would you like to:\n\n1. See available doctors nearby\n2. Book an instant video consultation\n3. Visit a clinic in person";
    } else {
      return "I'm here to help! Can you describe your symptoms in more detail? For example:\n\n• What symptoms are you experiencing?\n• How long have you had them?\n• Any other related concerns?\n\nNote: For emergencies, please call 102 or visit the nearest hospital immediately.";
    }
  };

  const quickQuestions = [
    { icon: "thermometer", text: "I have a fever" },
    { icon: "skull", text: "Headache and dizziness" },
    { icon: "water", text: "Cold and cough" },
    { icon: "calendar", text: "Book an appointment" },
  ];

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={["#7E57C2", "#6A3FB5", "#5E35B1"]}
        style={{
          paddingHorizontal: 16,
          paddingTop: 48,
          paddingBottom: 20,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View
              className="w-14 h-14 rounded-full items-center justify-center mr-3"
              style={{
                backgroundColor: "rgba(255,255,255,0.25)",
                borderWidth: 2,
                borderColor: "rgba(255,255,255,0.4)",
              }}
            >
              <Ionicons name="chatbubbles" size={26} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-xl font-bold text-white">
                AI Health Assistant
              </Text>
              <View className="flex-row items-center mt-1">
                <View
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: "#4CAF50" }}
                />
                <Text className="text-xs text-white opacity-90">
                  Online • Always here to help
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            activeOpacity={0.8}
          >
            <Ionicons name="information-circle" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-3 ${
              message.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            {message.sender === "bot" && (
              <View className="flex-row items-end mb-2">
                <View
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: COLORS.primaryLight }}
                >
                  <Ionicons
                    name="chatbubbles"
                    size={16}
                    color={COLORS.primary}
                  />
                </View>
                <View
                  className="max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-3"
                  style={{
                    backgroundColor: COLORS.white,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 2,
                  }}
                >
                  <Text
                    className="text-sm leading-5"
                    style={{ color: COLORS.textPrimary }}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            )}

            {message.sender === "user" && (
              <View className="flex-row items-end justify-end mb-2">
                <View
                  className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-3"
                  style={{
                    backgroundColor: "#7E57C2",
                    shadowColor: "#7E57C2",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text className="text-sm text-white leading-5">
                    {message.text}
                  </Text>
                </View>
                <View
                  className="w-8 h-8 rounded-full items-center justify-center ml-2"
                  style={{ backgroundColor: "#E3F2FD" }}
                >
                  <Ionicons name="person" size={16} color={COLORS.primary} />
                </View>
              </View>
            )}

            <Text
              className={`text-xs mt-1 ${
                message.sender === "user" ? "mr-10" : "ml-10"
              }`}
              style={{ color: COLORS.textSecondary }}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        ))}

        {isTyping && (
          <View className="items-start mb-3">
            <View className="flex-row items-end">
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-2"
                style={{ backgroundColor: COLORS.primaryLight }}
              >
                <Ionicons name="chatbubbles" size={16} color={COLORS.primary} />
              </View>
              <View
                className="rounded-2xl rounded-bl-sm px-4 py-3"
                style={{ backgroundColor: COLORS.white }}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: COLORS.textSecondary }}
                  />
                  <View
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: COLORS.textSecondary }}
                  />
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS.textSecondary }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Quick Questions (only show at start) */}
        {messages.length <= 2 && (
          <View className="mt-4">
            <Text
              className="text-sm font-bold mb-3"
              style={{ color: COLORS.textPrimary }}
            >
              Quick Suggestions
            </Text>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                className="mb-2 rounded-2xl p-4 flex-row items-center"
                style={{
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                  borderColor: COLORS.grayLight,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  elevation: 2,
                }}
                onPress={() => {
                  setInputText(question.text);
                }}
                activeOpacity={0.7}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: "#F3E5F5" }}
                >
                  <Ionicons
                    name={question.icon as any}
                    size={20}
                    color="#7E57C2"
                  />
                </View>
                <Text
                  className="text-sm flex-1"
                  style={{ color: COLORS.textPrimary }}
                >
                  {question.text}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Warning Banner */}
      <View
        style={{
          backgroundColor: "#FFF3E0",
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#FFE0B2",
        }}
      >
        <View className="flex-row items-center">
          <Ionicons name="warning" size={16} color="#FF9800" />
          <Text className="text-xs ml-2 flex-1" style={{ color: "#E65100" }}>
            AI guidance only. For emergencies, call 102 immediately
          </Text>
        </View>
      </View>

      {/* Input Box */}
      <View
        className="px-4 py-3 flex-row items-center"
        style={{
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.grayLight,
        }}
      >
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center mr-2"
          style={{ backgroundColor: COLORS.grayLight }}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <View
          className="flex-1 rounded-full px-4 py-2 mr-2 flex-row items-center"
          style={{
            backgroundColor: COLORS.grayLight,
            maxHeight: 100,
          }}
        >
          <TextInput
            className="flex-1 text-sm"
            style={{ color: COLORS.textPrimary }}
            placeholder="Type your symptoms or questions..."
            placeholderTextColor={COLORS.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
        </View>

        <TouchableOpacity
          className="w-11 h-11 rounded-full items-center justify-center"
          style={{
            backgroundColor: inputText.trim() ? "#7E57C2" : COLORS.grayLight,
            shadowColor: inputText.trim() ? "#7E57C2" : "transparent",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: inputText.trim() ? 3 : 0,
          }}
          onPress={handleSend}
          disabled={!inputText.trim()}
          activeOpacity={0.8}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() ? "#FFFFFF" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
