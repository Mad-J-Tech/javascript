const fizz = document.getElementById('fizz').value;
const buzz = document.getElementById('buzz').value;

for (let i = 1; i < 100; i++) {
    if (i % fizz === 0 && i % buzz !== 0) {
        let elem = document.createElement('p');
        let num = document.createTextNode(i);
        document.body.appendChild(elem);
        elem.appendChild(num);
    }
}