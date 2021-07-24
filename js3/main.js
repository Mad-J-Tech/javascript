const tbody = document.getElementById('tbody')

const btn = document.getElementById('btn');

const todos = [];

const option = document.getElementsByName("radiogroup");

function checkOption() {
    const progress_tasks = document.querySelectorAll('.progress');
    const done_tasks = document.querySelectorAll('.done');
    const all_tasks = document.querySelectorAll('.progress, .done');

    if (option[0].checked) {
        all_tasks.forEach(element => {
            element.style.display = '';
        });
    } else if (option[1].checked) {
        progress_tasks.forEach(element => {
            element.style.display = '';
        });
        done_tasks.forEach(element => {
            element.style.display = 'none';
        });
    } else if (option[2].checked) {
        progress_tasks.forEach(element => {
            element.style.display = 'none';
        });
        done_tasks.forEach(element => {
            element.style.display = '';
        });
    }
}

option.forEach(element => {
    element.addEventListener('click', checkOption, false);
});


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

        if (statbtn.value === "作業中") {
            newRow.classList.add("progress");
        } else {
            newRow.classList.add("done");
        }
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

    if (task["status"] === "作業中") {
        task["status"] = "完了";
    } else {
        task["status"] = "作業中";
    }
    showTasks();
    checkOption();
}


function deleteTask() {
    todos.splice(this.index, 1);
    showTasks();
}


btn.addEventListener('click', () => {
    addTask();
    showTasks();
    checkOption();
});

