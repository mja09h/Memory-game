import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Card from "./Card";
import { formatTime } from "./utils";

interface GameBoardProps {
  gameLevel: number;
  gameScore: number;
  gameIncorrect: number;
  gameTime: number;
  shuffledCards: any[];
  flippedCards: number[];
  matchedPairs: number[];
  onCardPress: (cardId: number) => void;
  onStopGame: () => void;
}

export default function GameBoard({
  gameLevel,
  gameScore,
  gameIncorrect,
  gameTime,
  shuffledCards,
  flippedCards,
  matchedPairs,
  onCardPress,
  onStopGame,
}: GameBoardProps) {
  const handleCardPress = (cardId: number) => {
    const card = shuffledCards.find((c) => c.id === cardId);
    if (!card) return;

    const isFlipped = flippedCards.includes(card.id);
    const isMatched = matchedPairs.includes(card.pairId);

    if (isMatched || isFlipped || flippedCards.length >= 2) {
      return;
    }

    onCardPress(cardId);
  };

  return (
    <View style={styles.gameContent}>
      <Text style={styles.gameTitle}>Level {gameLevel}</Text>
      <Text style={styles.gameScore}>Score: {gameScore}</Text>
      <Text style={styles.gameIncorrect}>Incorrect: {gameIncorrect}</Text>
      <Text style={styles.gameTime}>Time: {formatTime(gameTime)}</Text>
      <View style={styles.gameCards}>
        {shuffledCards.map((card) => {
          const isFlipped = flippedCards.includes(card.id);
          const isMatched = matchedPairs.includes(card.pairId);

          return (
            <Card
              key={card.id}
              card={card}
              isFlipped={isFlipped}
              isMatched={isMatched}
              onPress={() => handleCardPress(card.id)}
            />
          );
        })}
        <TouchableOpacity style={styles.gameStopButton} onPress={onStopGame}>
          <Text style={styles.gameStopButtonText}>Stop Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContent: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2c3e50",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  gameScore: {
    fontSize: 20,
    color: "#27ae60",
    marginBottom: 6,
    fontWeight: "700",
  },
  gameIncorrect: {
    fontSize: 20,
    color: "#e74c3c",
    marginBottom: 6,
    fontWeight: "700",
  },
  gameTime: {
    fontSize: 22,
    color: "#3498db",
    fontWeight: "700",
    marginBottom: 20,
  },
  gameCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 10,
    width: "100%",
  },
  gameStopButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 20,
    backgroundColor: "#e74c3c",
    marginTop: 20,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gameStopButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
});

