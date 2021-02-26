import { toLoadStatistic, clearStatistic } from './saveAndCreateStatistics.js';
import { getDifficultWords } from './restoreDifficultWords.js';
import { createCard } from '../../app.js';
import { renderCard } from '../renderCard/renderCards.js';
import { sortTableByColumn } from './sortTable.js';

export const createStatisticTable = () => {
  let data = toLoadStatistic();
  if (document.getElementById('table')) {
    document.getElementById('table').remove();
  }
  const containerTable = document.createElement('div');
  containerTable.className = 'container-table';
  const btnClean = document.createElement('button');
  btnClean.className = 'button-clean';
  btnClean.innerHTML = 'Reset';
  const btnRepeat = document.createElement('button');
  btnRepeat.className = 'button-repeat-wrong';
  btnRepeat.innerHTML = 'Repeat difficult words';
  containerTable.append(btnClean);
  containerTable.append(btnRepeat);
  const table = document.createElement('table');
  table.id = 'table';
  const tbody = document.createElement('tbody');
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>
                        <th class="header-word" data-row="0"><div><span class="material-icons">swap_vert</span>Word</div></th>
                        <th class="header-word" data-row="1"><div><span class="material-icons">swap_vert</span>Translation</div></th>
                        <th class="header-word" data-row="2"><div><span class="material-icons">swap_vert</span>Category</div></th>
                        <th class="header-word" data-row="3"><div><span class="material-icons">swap_vert</span>Clicks</div></th>
                        <th class="header-word" data-row="4"><div><span class="material-icons">swap_vert</span>Correct</div></th>
                        <th class="header-word" data-row="5"><div><span class="material-icons">swap_vert</span>Wrong</div></th>
                        <th class="header-word" data-row="6"><div><span class="material-icons">swap_vert</span>% correct answers</div></th>
                      </tr>`;
  table.append(thead);
  table.append(tbody);
  Object.keys(data).forEach((prop) => {
    const percent = Number(((100 * data[prop].correct) / (data[prop].correct + data[prop].wrong)).toFixed(2)) || 0;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${data[prop].word}</td>
               <td>${data[prop].translation}</td>
               <td>${data[prop].category}</td>
               <td>${data[prop].clicks}</td>
               <td>${data[prop].correct}</td>
               <td>${data[prop].wrong}</td>
               <td>${percent}</td>`;
    tbody.append(tr);
  });

  document.getElementById('category').append(containerTable);
  containerTable.append(table);

  thead.addEventListener('click', (e) => {
    if (e.target.closest('.header-word')) {
      sortTableByColumn(e.target.closest('.header-word').dataset.row);
    }
  });

  btnClean.addEventListener('click', () => {
      clearStatistic()
      createStatisticTable();
  })

  btnRepeat.addEventListener('click', () => {
    const wrongCard = getDifficultWords();
    if (wrongCard.length === 0) {
      document.getElementById('modal').classList.add('show-modal');
    } else if (document.querySelector('.container-table')) {
      document.querySelector('.container-table').remove();
      createCard(wrongCard, renderCard);
      document.getElementById('category').setAttribute('data-categories', 'repeatCard');
      if (document.body.classList.contains('game-mode') && document.getElementById('category').getAttribute('data-categories') === 'repeatCard') {
        document.body.classList.add('game-card');
      }
      document.querySelector('.checkbox-label').addEventListener('click', () => {
        if (document.body.classList.contains('game-mode') && document.getElementById('category').getAttribute('data-categories') === 'repeatCard') {
          document.body.classList.add('game-card');
        }
      });
    }
  });
  document.querySelectorAll('.menu-category').forEach((el) => {
    el.addEventListener('click', () => {
      if (containerTable) {
        containerTable.remove();
      }
    })  
  })
  document.querySelector('.main-page').addEventListener('click', () => {
    if (containerTable) {
      containerTable.remove();
    }
  })
}
