const tbody = document.getElementById('tbody')

const btn = document.getElementById('btn');

const todos = [];

function showTasks() {
    while (tbody.childNodes[0]) {
        tbody.removeChild(tbody.childNodes[0]);
    }

    for (i = 0; i < todos.length; i++) {
        const newRow = tbody.insertRow();
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
        statbtn.addEventListener('click', { index: i, handleEvent: toggleTask }, false);

        newCell = newRow.insertCell();
        const delbtn = document.createElement('input');
        delbtn.type = 'button';
        delbtn.value = '削除';
        newCell.appendChild(delbtn);
        delbtn.addEventListener('click', { index: i, handleEvent: deleteTask }, false);
    }
}

function addTask() {
    const textbox = document.getElementById('comment');
    const comment = textbox.value;
    let todo = { task: comment, status: "作業中" };
    todos.push(todo);
    return todos;
}

function toggleTask() {
    let task = todos[this.index];

    if (task["status"] == "作業中") {
        task["status"] = "完了";
    } else {
        task["status"] = "作業中";
    }
    showTasks();
}


function deleteTask() {
    todos.splice(this.index, 1);
    showTasks();
}


btn.addEventListener('click', () => {
    addTask();
    showTasks();
});


