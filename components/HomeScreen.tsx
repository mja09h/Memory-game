import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getTimeForLevel, getPairsForLevel, formatTime } from "./utils";

interface HomeScreenProps {
  gameLevel: number;
  onStartGame: () => void;
}

export default function HomeScreen({ gameLevel, onStartGame }: HomeScreenProps) {
  return (
    <View style={styles.mainContent}>
      <Text style={styles.title}>Can You Remember?</Text>
      <Text style={styles.subtitle}>Memory Game</Text>
      <Text style={styles.homeLevel}>Level {gameLevel}</Text>
      <Text style={styles.homeLevelInfo}>
        Time Available: {formatTime(getTimeForLevel(gameLevel))}
      </Text>
      <Text style={styles.homeLevelInfo}>
        Cards: {getPairsForLevel(gameLevel) * 2} ({getPairsForLevel(gameLevel)} pairs)
      </Text>
      <TouchableOpacity style={styles.StartGamebutton} onPress={onStartGame}>
        <Text style={styles.StartGamebuttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: 20,
    textAlign: "center",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 30,
    fontWeight: "500",
  },
  homeLevel: {
    fontSize: 32,
    fontWeight: "700",
    color: "#3498db",
    marginBottom: 8,
    textShadowColor: "#ecf0f1",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  homeLevelInfo: {
    fontSize: 17,
    color: "#34495e",
    marginBottom: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  StartGamebutton: {
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 25,
    backgroundColor: "#e74c3c",
    margin: 10,
    marginTop: 30,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  StartGamebuttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

