import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";

import cards from "./data/cards";
import {
  shuffleArray,
  getTimeForLevel,
  getPairsForLevel,
  getCardsForLevel,
} from "./components/utils";
import HomeScreen from "./components/HomeScreen";
import GameBoard from "./components/GameBoard";
import GameResultPopup from "./components/GameResultPopup";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);
  const [gameScore, setGameScore] = useState(0);
  const [gameIncorrect, setGameIncorrect] = useState(0);
  const [gameTime, setGameTime] = useState(300);
  const [gameEnded, setGameEnded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(shuffleArray(cards));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  const endGame = () => {
    setGameEnded(true);
    setGameStarted(false);
    setShowPopup(true);
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
  };

  const startNewGame = () => {
    const timeForLevel = getTimeForLevel(gameLevel);
    const cardsForLevel = getCardsForLevel(cards, gameLevel);
    setGameStarted(true);
    setGameEnded(false);
    setShowPopup(false);
    setGameScore(0);
    setGameIncorrect(0);
    setGameTime(timeForLevel);
    setFlippedCards([]);
    setMatchedPairs([]);
    setShuffledCards(shuffleArray(cardsForLevel));
  };

  const resetGame = () => {
    const cardsForLevel = getCardsForLevel(cards, gameLevel);
    setGameStarted(false);
    setGameEnded(false);
    setShowPopup(false);
    setGameScore(0);
    setGameIncorrect(0);
    setGameTime(getTimeForLevel(gameLevel));
    setFlippedCards([]);
    setMatchedPairs([]);
    setShuffledCards(shuffleArray(cardsForLevel));
  };

  const goToNextLevel = () => {
    setGameLevel((prev) => {
      const nextLevel = prev + 1;
      const timeForLevel = getTimeForLevel(nextLevel);
      const cardsForLevel = getCardsForLevel(cards, nextLevel);
      setGameStarted(true);
      setGameEnded(false);
      setShowPopup(false);
      setGameScore(0);
      setGameIncorrect(0);
      setGameTime(timeForLevel);
      setFlippedCards([]);
      setMatchedPairs([]);
      setShuffledCards(shuffleArray(cardsForLevel));
      return nextLevel;
    });
  };

  const handleCardPress = (cardId: number) => {
    setFlippedCards((prev) => [...prev, cardId]);
  };

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      gameTimerRef.current = setInterval(() => {
        setGameTime((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (gameTimerRef.current) {
          clearInterval(gameTimerRef.current);
        }
      };
    }
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    if (gameTime === 0 && gameStarted && !gameEnded) {
      endGame();
    }
  }, [gameTime, gameStarted, gameEnded]);

  useEffect(() => {
    const pairsNeeded = getPairsForLevel(gameLevel);
    if (matchedPairs.length === pairsNeeded && gameStarted && !gameEnded) {
      endGame();
    }
  }, [matchedPairs.length, gameStarted, gameEnded, gameLevel]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const card1 = shuffledCards.find((c) => c.id === flippedCards[0]);
      const card2 = shuffledCards.find((c) => c.id === flippedCards[1]);

      if (card1 && card2 && card1.pairId === card2.pairId) {
        setGameScore((prev) => prev + 1);
        setMatchedPairs((prev) => [...prev, card1.pairId]);
        setFlippedCards([]);
      } else if (card1 && card2 && card1.pairId !== card2.pairId) {
        setGameIncorrect((prev) => prev + 1);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setFlippedCards([]);
        }, 500);
      }
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [flippedCards]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentStyle}>
        {gameStarted ? (
          <GameBoard
            gameLevel={gameLevel}
            gameScore={gameScore}
            gameIncorrect={gameIncorrect}
            gameTime={gameTime}
            shuffledCards={shuffledCards}
            flippedCards={flippedCards}
            matchedPairs={matchedPairs}
            onCardPress={handleCardPress}
            onStopGame={endGame}
          />
        ) : (
          <HomeScreen gameLevel={gameLevel} onStartGame={startNewGame} />
        )}
      </ScrollView>
      <StatusBar style="auto" />

      <GameResultPopup
        visible={showPopup}
        gameLevel={gameLevel}
        gameScore={gameScore}
        gameIncorrect={gameIncorrect}
        gameTime={gameTime}
        onNextLevel={goToNextLevel}
        onRestart={resetGame}
        onClose={() => {
          setShowPopup(false);
          resetGame();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  contentStyle: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
  },
});
