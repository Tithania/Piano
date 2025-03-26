document.addEventListener('DOMContentLoaded', () => {
    // Elementos - ATUALIZE ESTAS LINHAS
    const keys = document.querySelectorAll('.key');
    const toggleCheckbox = document.querySelector('.checkbox__keys');
    const switcher = document.querySelector('.switcher');
    const pianoKeys = document.querySelector('.piano__keys'); // Renomeei para pianoKeys para evitar confusão

    // Estado inicial
    let showKeys = true;

    // Função para tocar notas
    const playNote = (key) => {
        const numero = key.getAttribute('data-number');
        const audio = new Audio(`notes/${numero}.wav`);
        audio.play().catch(e => console.log("Aguardando interação..."));
    };

    // Controle visual das teclas
    const handleKeyPress = (key, isPressed) => {
        if (isPressed) {
            key.style.transform = 'scale(0.98)';
            key.style.backgroundColor = key.classList.contains('black') ? '#333' : '#eee';
            playNote(key);
        } else {
            key.style.transform = 'scale(1)';
            key.style.backgroundColor = key.classList.contains('black') ? 'black' : 'white';
        }
    };

    // Controle do Mouse
    keys.forEach((key) => {
        key.addEventListener('mousedown', () => handleKeyPress(key, true));
        key.addEventListener('mouseup', () => handleKeyPress(key, false));
    });

    // Controle do Teclado
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
            handleKeyPress(key, true);
        }
    });

    document.addEventListener('keyup', (e) => {
        if (keyMap[e.key] !== undefined) {
            const key = keys[keyMap[e.key]];
            handleKeyPress(key, false);
        }
    });

    // Função para atualizar a visibilidade das teclas - CORRIGIDA
    const updateKeysVisibility = () => {
        // Atualiza o visual do botão
        switcher.style.backgroundColor = showKeys ? '#4CAF50' : '#ccc';
        const button = switcher.querySelector('.switcher__button');
        button.style.transform = showKeys ? 'translateX(25px)' : 'translateX(0)';

        // Mostra/oculta os labels - USANDO pianoKeys AGORA
        pianoKeys.classList.toggle('hide-keys', !showKeys);

        // Salva preferência
        localStorage.setItem('showPianoKeys', showKeys);
    };

    // Evento do checkbox
    toggleCheckbox.addEventListener('change', (e) => {
        showKeys = e.target.checked;
        updateKeysVisibility();
    });

    // Inicialização
    const savedPreference = localStorage.getItem('showPianoKeys');
    if (savedPreference !== null) {
        showKeys = savedPreference === 'true';
        toggleCheckbox.checked = showKeys;
    }
    updateKeysVisibility();

    // Tecla de atalho (Shift + H)
    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key.toLowerCase() === 'h') {
            toggleCheckbox.checked = !toggleCheckbox.checked;
            toggleCheckbox.dispatchEvent(new Event('change'));
        }
    });
});