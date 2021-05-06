function check() {

    const fizz = parseInt(document.fizzbuzz.elements[0].value);
    const buzz = parseInt(document.fizzbuzz.elements[1].value);

    console.log(fizz);

    for (let i = 1; i < 100; i++) {
        if (i % fizz === 0 && i % buzz !== 0) {
            let elem = document.createElement('p');
            let num = document.createTextNode(i);
            document.body.appendChild(elem);
            elem.appendChild(num);
        }
    }
}
