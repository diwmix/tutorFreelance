let replicaButton1 = document.querySelector('#btn1');
let replicaButton2 = document.querySelector('#btn2');
let replicaButton3 = document.querySelector('#btn3');
let replicaButton4 = document.querySelector('#btn4');

let typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 20,
    onStringTyped: (arrayPos, typed) => {
        typed.stop();
        if (arrayPos == 0) {
            setTimeout(() => {
                replicaButton1.style.display = "block"
            }, 1000)
        }
        if (arrayPos == 1) {
            setTimeout(() => {
                replicaButton2.style.display = "block"
            }, 1000)
        }
        if (arrayPos == 2) {
            setTimeout(() => {
                replicaButton3.style.display = "block"
            }, 1000)
        }
        if (arrayPos == 3) {
            setTimeout(() => {
                replicaButton4.style.display = "block"
            }, 1000) 
            
        }
    },
    preStringTyped: (arrayPos, typed) => {
        replicaButton1.style.display = "none"
        replicaButton2.style.display = "none"
        replicaButton3.style.display = "none"
    },
    onBegin: (typed) => {
        replicaButton1.style.display = "none"
        replicaButton2.style.display = "none"
        replicaButton3.style.display = "none"
        replicaButton4.style.display = "none"
    }
});

replicaButton1.addEventListener('click', () => {
    typed.start()
})
replicaButton2.addEventListener('click', () => {
    typed.start()
})
replicaButton3.addEventListener('click', () => {
    typed.start()
})

