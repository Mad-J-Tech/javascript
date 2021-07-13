
/*
btn.addEventListener('click', () => {
    //テーブルの削除処理
    while (table.childNodes[1]) {
        table.removeChild(table.childNodes[1]);
    }
    
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
        delbtn.classList.add('trash');
        newCell.appendChild(delbtn);
    }
});
*/

const table = document.getElementById('table');

const btn = document.getElementById('btn');

let todos = [];

function showTasks() {
    while (table.childNodes[1]) {
        table.removeChild(table.childNodes[1]);
    }

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
        delbtn.classList.add('trash');
        newCell.appendChild(delbtn);
    }

}

function addTask() {
    const textbox = document.getElementById('comment');
    const comment = textbox.value;
    let todo = { task: comment, status: "作業中" };
    todos.push(todo);
}

function deleteTask() {
    const delbtns = document.getElementsByClassName('trash');

    for (i = 0; i < delbtns.length; i++) {
        delbtns[i].addEventListener('click', () => {
            todos.splice(i, 1);
        });
    }
}


