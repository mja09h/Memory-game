import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { getTimeForLevel, getPairsForLevel, formatTime } from "./utils";

interface GameResultPopupProps {
  visible: boolean;
  gameLevel: number;
  gameScore: number;
  gameIncorrect: number;
  gameTime: number;
  onNextLevel: () => void;
  onRestart: () => void;
  onClose: () => void;
}

export default function GameResultPopup({
  visible,
  gameLevel,
  gameScore,
  gameIncorrect,
  gameTime,
  onNextLevel,
  onRestart,
  onClose,
}: GameResultPopupProps) {
  const isLevelComplete = gameScore === getPairsForLevel(gameLevel);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>
            {isLevelComplete ? "Level Complete!" : "Game Over!"}
          </Text>

          <Text style={styles.popupLevel}>Level: {gameLevel}</Text>
          <Text style={styles.popupScore}>
            Score: {gameScore}/{getPairsForLevel(gameLevel)}
          </Text>
          <Text style={styles.popupIncorrect}>Incorrect: {gameIncorrect}</Text>
          <Text style={styles.popupTime}>
            Time Remaining: {formatTime(gameTime)}
          </Text>

          {isLevelComplete ? (
            <View style={styles.popupButtonContainer}>
              <Text style={styles.popupNextLevel}>
                You completed the level!
              </Text>
              <Text style={styles.popupNextLevelInfo}>
                Next level: {formatTime(getTimeForLevel(gameLevel + 1))} (
                {getPairsForLevel(gameLevel + 1) * 2} cards)
              </Text>
              <TouchableOpacity
                style={[styles.popupButton, styles.nextLevelButton]}
                onPress={onNextLevel}
              >
                <Text style={styles.popupButtonText}>Next Level →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupButton, styles.restartButton]}
                onPress={onRestart}
              >
                <Text style={styles.popupButtonText}>Restart Level</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.popupButton} onPress={onClose}>
              <Text style={styles.popupButtonText}>Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  popupContent: {
    backgroundColor: "#ffffff",
    padding: 35,
    borderRadius: 25,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  popupTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  popupLevel: {
    fontSize: 26,
    fontWeight: "700",
    color: "#3498db",
    marginBottom: 8,
  },
  popupScore: {
    fontSize: 22,
    color: "#27ae60",
    marginBottom: 8,
    fontWeight: "700",
  },
  popupIncorrect: {
    fontSize: 22,
    color: "#e74c3c",
    marginBottom: 8,
    fontWeight: "700",
  },
  popupTime: {
    fontSize: 22,
    color: "#3498db",
    marginBottom: 25,
    fontWeight: "700",
  },
  popupButtonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  popupNextLevel: {
    fontSize: 19,
    fontWeight: "700",
    color: "#27ae60",
    marginBottom: 4,
  },
  popupNextLevelInfo: {
    fontSize: 17,
    color: "#7f8c8d",
    marginBottom: 18,
    fontWeight: "600",
  },
  popupButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#3498db",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  popupButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  nextLevelButton: {
    backgroundColor: "#27ae60",
    shadowColor: "#27ae60",
  },
  restartButton: {
    backgroundColor: "#95a5a6",
    shadowColor: "#95a5a6",
  },
});

