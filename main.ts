import { Serie } from './serie.js';
import { series } from './data.js';

let seriesTbody: HTMLElement = document.getElementById('series')!; // Nodo tbody que tiene el id="series"
const averageSeasonsElm: HTMLElement = document.getElementById("averageSeasons")!;
let cardsDiv: HTMLElement = document.getElementById('cards')!;

if (cardsDiv) {
  series.forEach(serie => {
    let cardHTML = createCardHTML(serie);
    cardsDiv.insertAdjacentHTML('beforeend', cardHTML);
  });
}

renderSeriesInTable(series);
averageSeasonsElm.innerHTML = `${getAverageNumSeasons(series)}`

function renderSeriesInTable(series: Serie[]): void {
  series.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.id}</td>
                           <th><a href="#card-${c.name}" id="${c.id}" class="serie-link">${c.name}</a></th>
                           <td>${c.channel}</td>
                           <td>${c.seasons}</td>`;
    seriesTbody.appendChild(trElement);
  });
}

function getAverageNumSeasons(series: Serie[]): number {
    const totalSeasons = series.reduce((sum, c) => sum + c.seasons, 0);
    const averageSeasons = totalSeasons / series.length;
    return averageSeasons;
}

function createCardHTML(serie: Serie) {
  return `
    <div class="card" id="card-${serie.id}" style="display: none;">
      <img src="${serie.photo}" class="card-img-top"">
      <div class="card-body">
        <h5 class="card-title">${serie.name}</h5>
        <p class="card-text">${serie.description}</p>
        <a href="${serie.URL}" class="card-text">${serie.URL}</a>
      </div>
    </div>
  `;
}

document.querySelectorAll('.serie-link').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      if (event.target) {
        let serieId = (event.target as HTMLElement).id;
        document.querySelectorAll('.card').forEach(card => {
          (card as HTMLElement).style.display = 'none';
        });
        let card = document.getElementById(`card-${serieId}`);
        if (card) {
          (card as HTMLElement).style.display = 'block';
        }
      }
    });
});