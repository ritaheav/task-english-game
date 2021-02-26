import './style.css';
import cards from './cardsData.js';
import { renderCard } from './services/renderCard/renderCards.js';
import { renderCategory } from './services/renderCard/renderCategory.js';
import {
  startGameBtn, onStartClick, chosenCard, failedCard, randomCard, repeatPlay, clickOnCards,
} from './services/game/gameMode.js';
import { createStatisticTable } from './services/statistic/createStatisticsTable.js';
import { saveStatistic, toLoadStatistic } from './services/statistic/saveAndCreateStatistics.js';
import { isClosedCard, notIsGameMode, isFrontSide } from './services/conditionFunction/condition.js';

export const createCard = (cards, func) => {
  for (const cr of document.querySelectorAll('.card')) {
    cr.remove();
  }
  document.querySelector('.statistic-page').classList.remove('current-page');
  const main = document.getElementById('category');
  cards.forEach((card) => main.append(func(card)));
  document.querySelectorAll('li').forEach((item) => {
    if (document.getElementById('category').dataset.categories === item.dataset.category) {
      item.classList.add('current-page');
    } else {
      item.classList.remove('current-page');
    }
  });
}
createCard(cards[0], renderCategory);

export const end = () => {
  if (document.querySelector('.repeat')) {
    document.querySelector('.repeat').removeEventListener('click', repeatPlay);
  }
  chosenCard.length = 0;
  failedCard.length = 0;
  startGameBtn.innerHTML = 'Start Game';
  for (const img of document.querySelectorAll('.rating img')) {
    img.remove();
  }
  startGameBtn.addEventListener('click', onStartClick);
  document.getElementById('category').removeEventListener('click', clickOnCards);
}

document.querySelector('.menu-category-list').addEventListener('click', (e) => {
  if(e.target.closest('.main-page')) {
    if (document.querySelector('.container-table')) {
      document.querySelector('.container-table').remove();
    }
    createCard(cards[0], renderCategory);
    document.body.classList.remove('game-card');
    document.getElementById('category').setAttribute('data-categories', 'main');
    if (document.body.classList.contains('game-mode')) {
      end();
    }
  }
  if(e.target.closest('.menu-category')) {
    if (document.querySelector('.container-table')) {
      document.querySelector('.container-table').remove();
    }
    document.body.classList.add('game-card');
    const index = +e.target.closest('.menu-category').dataset.category;
    document.getElementById('category').setAttribute('data-categories', index);
    createCard(cards[index + 1], renderCard);
    if (document.body.classList.contains('game-card')) {
      end();
    }
  }
  if(e.target.closest('.statistic-page')) {
    for (const cr of document.querySelectorAll('.card')) {
      cr.remove();
    }
    if (document.body.classList.contains('game-card')) {
      document.body.classList.remove('game-mode');
      document.body.classList.remove('game-card');
      document.querySelector('.checkbox-label').click();
      end();
    }
    document.querySelectorAll('li').forEach((item) => {
      item.classList.remove('current-page');
    });
    document.getElementById('category').setAttribute('data-categories', 'statistic');
    document.querySelector('.statistic-page').classList.add('current-page');
    createStatisticTable();
  }
})

document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.menu-container').classList.add('activity');
});
document.querySelector('.burger-menu').addEventListener('click', () => {
  document.querySelector('.menu-container').classList.remove('activity');
});
window.addEventListener('click', (e) => {
  if (e.target.closest('.menu-container') || e.target.closest('li')) {
    document.querySelector('.menu-container').classList.remove('activity');
  } else {
    return false;
  }
});


document.getElementById('category').addEventListener('click', (e) => {
  if (isClosedCard(e) && notIsGameMode() && isFrontSide(e)) {
    e.target.closest('.card-item').querySelector('audio').play();
    const { word } = e.target.closest('.card-item').dataset;
    let statistics = toLoadStatistic();
    statistics[word].clicks++;
    saveStatistic(statistics);
  }
  if (e.target.closest('.turn-btn')) {
    e.target.closest('.card-front').classList.add('front-rotate');
    e.target.closest('.card-item').querySelector('.card-back').classList.add('back-rotate');
  }
  if (e.target.closest('.card-category')) {
    document.body.classList.add('game-card');
    const index = +e.target.closest('.card-category').dataset.category;
    document.getElementById('category').setAttribute('data-categories', index);
    createCard(cards[index + 1], renderCard);
  }
  document.querySelectorAll('.card-item').forEach((item) => item.addEventListener('mouseleave', () => {
    document.querySelectorAll('.card-front').forEach((item) => item.classList.remove('front-rotate'));
    document.querySelectorAll('.card-back').forEach((item) => item.classList.remove('back-rotate'));
  }));
});

document.getElementById('close').addEventListener('click', (e) => {
  modal.classList.remove('show-modal');
});

window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});


