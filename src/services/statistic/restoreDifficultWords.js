import { toLoadStatistic } from './saveAndCreateStatistics.js';
import cards from '../../cardsData.js';

export const getDifficultWords = () => {
  const difficultWords = Object.values(toLoadStatistic()).map((word) => {
    const percent = Number(((100 * word.wrong) / (word.correct + word.wrong)).toFixed(2)) || 0;
    return { word: word.word, percent };
  }).sort((a, b) => b.percent - a.percent).slice(0, 8)
    .filter((x) => +x.percent)
    .reduce((obj, item) => ({
      ...obj, [item.word]: item.word,
    }), {});
  const wrongCards = cards.slice(1).reduce((a, b) => [...a, ...b], []).filter((value) => Object.keys(difficultWords).includes(value.word));
  return wrongCards;
};
