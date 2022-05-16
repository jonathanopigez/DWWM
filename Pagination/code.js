let letterList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function showList() {
  let tableList = "";
  for (let i = first; i < first + numberOfItems; i++) {
    {
      console.log(i);
      if (i < letterList.length) {
        tableList += `
        <tr>
          <td>${letterList[i]}</td>
        </tr>
      `;
      }
    }
    document.getElementById("letterList").innerHTML = tableList;
  }
}

function nextPage() {
  if (first + numberOfItems <= letterList.length) {
    first += numberOfItems;
    actualPage++;
    showList();
  }
}

function previous() {
  if (first - numberOfItems >= 0) {
    first -= numberOfItems;
    actualPage--;
    showList();
  }
}

function firstPage() {
  first = 0;
  actualPage = 1;
  showList();
}

let maxPages = Math.ceil(letterList.length / numberOfItems);

function lastPage() {
  first = maxPages * numberOfItems - numberOfItems;
  actualPage = maxPages;
  showList();
}
function showPageInfo() {
  document.getElementById("pageInfo").innerHTML = `
      Page ${actualPage} / ${maxPages}
    `;
}
showList();
