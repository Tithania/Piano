const keys = document.querySelectorAll('.key');

const playNote = (key) => {
    const numero = key.getAttribute('data-number');
    const audio = new Audio(`notes/${numero}.wav`);
    audio.play().catch(e => console.log("Aguardando interação..."));
};

// Controle do Mouse
keys.forEach((key) => {
    key.addEventListener('mousedown', () => {
        playNote(key);
        key.style.transform = 'scale(0.98)';
        if (key.classList.contains('black')) {
            key.style.backgroundColor = '#333';
        } else {
            key.style.backgroundColor = '#eee';
        }
    });

    key.addEventListener('mouseup', () => {
        key.style.transform = 'scale(1)';
        if (key.classList.contains('black')) {
            key.style.backgroundColor = 'black';
        } else {
            key.style.backgroundColor = 'white';
        }
    });
});

// Controle do Teclado (Opcional)
const keyMap = {
    "Tab": 0, "1": 1, "q": 2, "2": 3, "w": 4, 
    "e": 5, "4": 6, "r": 7, "5": 8, "t": 9,
    "6": 10, "y": 11, "u": 12, "8": 13, "i": 14,
    "9": 15, "o": 16, "p": 17, "-": 18, "[": 19,
    "=": 20, "]": 21, "Backspace": 22, "\\": 23
};

document.addEventListener('keydown', (e) => {
    if (keyMap[e.key] !== undefined) {
        const key = keys[keyMap[e.key]];
        key.dispatchEvent(new Event('mousedown'));
    }
});

document.addEventListener('keyup', (e) => {
    if (keyMap[e.key] !== undefined) {
        const key = keys[keyMap[e.key]];
        key.dispatchEvent(new Event('mouseup'));
    }
});