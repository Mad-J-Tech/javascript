const table = document.getElementById('table');

const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    const newRow = table.insertRow();
    const index = newRow.rowIndex - 1;
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(index);
    newCell.appendChild(newText);

    const textbox = document.getElementById('comment');
    const comment = textbox.value;
    newCell = newRow.insertCell();
    newText = document.createTextNode(comment);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    const statbtn = document.createElement('input');
    statbtn.type = 'button';
    statbtn.value = '作業中';
    newCell.appendChild(statbtn);

    newCell = newRow.insertCell();
    const delbtn = document.createElement('input');
    delbtn.type = 'button';
    delbtn.value = '削除';
    newCell.appendChild(delbtn);

});
