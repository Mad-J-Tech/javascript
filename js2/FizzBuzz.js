function check() {

    /*
    const fizz = parseInt(document.fizzbuzz.elements[0].value);
    const buzz = parseInt(document.fizzbuzz.elements[1].value);
    */

    const fizzStr = document.fizzbuzz.elements[0].value;
    const buzzStr = document.fizzbuzz.elements[1].value;

    function toHalfWidth(str) {
        return str.replace(/[０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    function fizzbuzz(fizz, buzz) {
        for (let i = 1; i < 100; i++) {
            if (i % fizz === 0 && i % buzz !== 0) {
                let elem = document.createElement('p');
                let num = document.createTextNode("Fizz " + i);
                document.body.appendChild(elem);
                elem.appendChild(num);
            } else if (i % fizz !== 0 && i % buzz === 0) {
                let elem = document.createElement('p');
                let num = document.createTextNode("Buzz " + i);
                document.body.appendChild(elem);
                elem.appendChild(num);
            } else if (i % fizz === 0 && i % buzz === 0) {
                let elem = document.createElement('p');
                let num = document.createTextNode("FizzBuzz " + i);
                document.body.appendChild(elem);
                elem.appendChild(num);
            }
        }
    }

    function error() {
        let elem = document.createElement('p');
        let text = document.createTextNode("整数を入力してください");
        document.body.appendChild(text);
    }

    if (Number.isInteger(parseFloat(fizzStr)) && Number.isInteger(parseFloat(buzzStr))) {
        const fizz = fizzStr;
        const buzz = buzzStr;
        fizzbuzz(fizz, buzz);
    } else if (fizzStr.match(/[０-９]/) && buzzStr.match(/[0-9]/)) {
        const fizz = toHalfWidth(fizzStr);
        const buzz = buzzStr;
        fizzbuzz(fizz, buzz);
    } else if (buzzStr.match(/[０-９]/) && fizzStr.match(/[0-9]/)) {
        const fizz = fizzStr;
        const buzz = toHalfWidth(buzzStr);
        fizzbuzz(fizz, buzz);
    } else {
        error();
    }



}