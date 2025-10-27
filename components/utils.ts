export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const getTimeForLevel = (level: number) => {
    return Math.max(120, 300 - (level - 1) * 30);
};

export const getPairsForLevel = (level: number) => {
    return Math.min(16, 2 * level);
};

export const getCardsForLevel = (allCards: any[], level: number) => {
    const pairsNeeded = getPairsForLevel(level);
    const cardsNeeded = pairsNeeded * 2;
    return allCards.slice(0, cardsNeeded);
};

