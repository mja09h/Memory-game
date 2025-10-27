import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface CardProps {
  card: { id: number; pairId: number; image: string };
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
}

export default function Card({ card, isFlipped, isMatched, onPress }: CardProps) {
  return (
    <TouchableOpacity style={styles.gameCard} onPress={onPress}>
      {isFlipped || isMatched ? (
        <View style={styles.gameCardImage}>
          <Text style={styles.gameCardEmoji}>{card.image}</Text>
        </View>
      ) : (
        <View style={styles.gameCardBack} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gameCard: {
    width: 85,
    height: 85,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    margin: 5,
    shadowColor: "#2c3e50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  gameCardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  gameCardBack: {
    width: "100%",
    height: "100%",
    backgroundColor: "#bdc3c7",
    borderWidth: 3,
    borderColor: "#95a5a6",
  },
  gameCardEmoji: {
    fontSize: 42,
    textAlign: "center",
  },
});

