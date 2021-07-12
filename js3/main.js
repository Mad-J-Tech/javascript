/*
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
*/

const table = document.getElementById('table');

const btn = document.getElementById('btn');

let todos = [];

btn.addEventListener('click', () => {
    //テーブルの削除処理

    const textbox = document.getElementById('comment');
    const comment = textbox.value;
    let todo = { task: comment, status: "作業中" };
    todos.push(todo);

    for (i = 0; i < todos.length; i++) {
        const newRow = table.insertRow();
        const index = i;
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(index);
        newCell.appendChild(newText);

        newCell = newRow.insertCell();
        newText = document.createTextNode(todos[i].task);
        newCell.appendChild(newText);

        newCell = newRow.insertCell();
        const statbtn = document.createElement('input');
        statbtn.type = 'button';
        statbtn.value = todos[i].status;
        newCell.appendChild(statbtn);

        newCell = newRow.insertCell();
        const delbtn = document.createElement('input');
        delbtn.type = 'button';
        delbtn.value = '削除';
        newCell.appendChild(delbtn);
    }
});

