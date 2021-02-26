export const sortTableByColumn = (n) => {
  let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  table = document.getElementById('table');
  switching = true;
  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName('TR');
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      let cmpX = isNaN(parseInt(x.innerHTML)) ? x.innerHTML.toLowerCase() : parseInt(x.innerHTML);
      let cmpY = isNaN(parseInt(y.innerHTML)) ? y.innerHTML.toLowerCase() : parseInt(y.innerHTML);
      cmpX = (cmpX === '-') ? 0 : cmpX;
      cmpY = (cmpY === '-') ? 0 : cmpY;
      if (dir === 'asc') {
        if (cmpX > cmpY) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (cmpX < cmpY) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else if (switchcount === 0 && dir === 'asc') {
      dir = 'desc';
      switching = true;
    }
  }
}
