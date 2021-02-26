import cards from '../../cardsData.js';

export const createStatisticsData = () => {
  const statistics = {};

  for (let i = 1; i - 1 < cards[0].length; i++) {
    for (let j = 0; j < cards[i].length; j++) {
      statistics[cards[i][j].word] = {
        word: cards[i][j].word,
        translation: cards[i][j].translation,
        category: cards[0][i - 1].name,
        clicks: 0,
        correct: 0,
        wrong: 0,
      };
    }
  }
  return statistics;
};
