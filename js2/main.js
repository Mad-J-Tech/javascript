function check() {

    const parentDiv = document.getElementById("parentDiv");
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }

    const fizzStr = document.fizzbuzz.elements[0].value;
    const buzzStr = document.fizzbuzz.elements[1].value;

    function convertToHalfwith(str) {
        return str.replace(/[０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    function showResult(fizz, buzz) {
        for (let i = 1; i < 100; i++) {
            if (i % fizz === 0 && i % buzz !== 0) {
                let elem = document.createElement('p');
                let num = document.createTextNode("Fizz " + i);
                let parentDiv = document.getElementById("parentDiv");
                parentDiv.insertBefore(elem, null);
                elem.appendChild(num);
            } else if (i % fizz !== 0 && i % buzz === 0) {
                let elem = document.createElement('p');
                let num = document.createTextNode("Buzz " + i);
                let parentDiv = document.getElementById("parentDiv");
                parentDiv.insertBefore(elem, null);
                elem.appendChild(num);
            } else if (i % fizz === 0 && i % buzz === 0) {
                let elem = document.createElement('p');
                let num = document.createTextNode("FizzBuzz " + i);
                let parentDiv = document.getElementById("parentDiv");
                parentDiv.insertBefore(elem, null);
                elem.appendChild(num);
            }
        }
    }

    function showError() {
        let elem = document.createElement('p');
        let text = document.createTextNode("整数を入力してください");
        let parentDiv = document.getElementById("parentDiv");
        parentDiv.insertBefore(elem, null);
        elem.appendChild(text);
    }

    if (Number.isInteger(parseFloat(fizzStr)) && Number.isInteger(parseFloat(buzzStr))) {
        const fizz = fizzStr;
        const buzz = buzzStr;
        showResult(fizz, buzz);
    } else if (fizzStr.match(/[０-９]/) && buzzStr.match(/[0-9]/)) {
        const fizz = convertToHalfwith(fizzStr);
        const buzz = buzzStr;
        showResult(fizz, buzz);
    } else if (buzzStr.match(/[０-９]/) && fizzStr.match(/[0-9]/)) {
        const fizz = fizzStr;
        const buzz = convertToHalfwith(buzzStr);
        showResult(fizz, buzz);
    } else {
        showError();
    }

}