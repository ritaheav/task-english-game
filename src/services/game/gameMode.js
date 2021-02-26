import cards from '../../cardsData.js';
import { renderCategory } from '../renderCard/renderCategory.js';
import { createCard } from '../../app.js';
import { toLoadStatistic } from '../statistic/saveAndCreateStatistics.js';
import { saveStatistic } from '../statistic/saveAndCreateStatistics.js';

export const startGameBtn = document.getElementById('start-game');
const rating = document.querySelector('.rating');
const countError = document.querySelector('.count-error');
export const chosenCard = [];
export const failedCard = [];
export let randomCard;
const success = 'audio/success.mp3';
const error = 'audio/error.mp3';
let statistics;

export const onStartClick = () => {
  startGameBtn.innerHTML = '<span class="material-icons">replay</span>';
  startGameBtn.classList.add('repeat');
  startGame();
  
};

export const repeatPlay = () => {
  randomCard.querySelector('audio').play();
};


export const clickOnCards = (e) => {
  const { word } = randomCard.dataset;
  if (document.body.classList.contains('game-mode')) {
    if (!e.target.closest('.card-item')) {
      return false;
    }

    if (e.target.closest('.card-item') === randomCard) {
      statistics[word].correct++;
      playAudio(success);
      e.target.closest('.card-item').classList.add('checked-card');
      randomCard = createRandomCard();
      if (randomCard === undefined) {
        setTimeout(() => { showEndGame(); }, 2500);
        setTimeout(() => { backToMenu(); }, 5000);
        startGameBtn.addEventListener('click', onStartClick);
      } else {
        const playRandomAudio = setTimeout(() => {
          if (randomCard === undefined) {
            clearInterval(playRandomAudio);
          } else {
            randomCard.querySelector('audio').play();
          }
        }, 2300);
      }

      chosenCard.push(randomCard);
      const successImage = document.createElement('img');
      successImage.className = 'star-success';
      successImage.src = 'images/smile.png';
      rating.append(successImage);
    } else {
      statistics[word].wrong++;
      playAudio(error);
      failedCard.push(e.target.closest('.card-item'));
      const failedImage = document.createElement('img');
      failedImage.className = 'star-error';
      failedImage.src = 'images/sad.png';
      rating.append(failedImage);
    }
  }

  let showEndGame = () => {
    if (failedCard.length) {
      playAudio(error);
      document.body.classList.add('failed');

      countError.innerHTML = `You have ${failedCard.length} mistake`;
    } else {
      playAudio(success);
      document.body.classList.add('success');
      countError.innerHTML = 'You win!';
    }
    document.body.classList.remove('game-mode');
    document.body.classList.remove('game-card');
    document.querySelector('.repeat').removeEventListener('click', repeatPlay);
    startGameBtn.classList.remove('repeat');
  };
  let backToMenu = () => {
    document.body.classList.remove('failed');
    document.body.classList.remove('success');
    document.getElementById('category').setAttribute('data-categories', 'main');
    createCard(cards[0], renderCategory);
    startGameBtn.innerHTML = 'Start Game';
    chosenCard.length = 0;
    failedCard.length = 0;
    document.querySelector('.checkbox-label').click();
    document.getElementById('category').removeEventListener('click', clickOnCards);
  };
  saveStatistic(statistics);
};

document.querySelector('.checkbox-label').addEventListener('click', () => {
  document.querySelector('.train').classList.toggle('none');
  document.querySelector('.play').classList.toggle('none');
  randomCard = undefined;
  document.querySelectorAll('.card-item').forEach((card) => card.classList.remove('checked-card'));
  document.getElementById('category').removeEventListener('click', clickOnCards);
  if (document.querySelector('.train').classList.contains('none')) {
    startGameBtn.classList.add('repeat');
    document.querySelector('.repeat').removeEventListener('click', repeatPlay);
    document.body.classList.add('game-mode');
    startGameBtn.addEventListener('click', onStartClick);
  } else {
    document.body.classList.remove('game-mode');
    startGameBtn.innerHTML = 'Start Game';
    for (const img of document.querySelectorAll('.rating img')) {
      img.remove();
    }
    chosenCard.length = 0;
    failedCard.length = 0;
  }
});

function createRandomCard() {
  const cardsGame = document.querySelectorAll('.card-item:not(.checked-card)');
  const index = Math.floor(Math.random() * 1000) % cardsGame.length;
  randomCard = cardsGame[index];
  return randomCard;
}

export function startGame() {
  randomCard = createRandomCard();
  randomCard.querySelector('audio').play();
  statistics = toLoadStatistic();
  document.getElementById('category').addEventListener('click', clickOnCards);

  startGameBtn.removeEventListener('click', onStartClick);
  document.querySelector('.repeat').addEventListener('click', repeatPlay);
}

function playAudio(audioSrc) {
  const audio = new Audio();
  audio.src = audioSrc;
  audio.autoplay = true;
}
