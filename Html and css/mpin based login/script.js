const inputRow = document.getElementById('input-row');
const inputs = document.querySelectorAll('.mpin-inputs input');
const button = document.getElementById('login-btn');
const form = document.getElementById('mpin-form');
const errorMsg = document.getElementById('error-msg');
function getPinString() {
    let pinCode = "";
    inputs.forEach(box => {
        pinCode += box.value.trim();
    });
    return pinCode;
}

function updateButtonUI() {
    if (getPinString().length === 4) {
        button.classList.add('ready');
    } else {
        button.classList.remove('ready');
    }
}

function clearInputs() {
    inputs.forEach(input => input.value = '');
    if (inputs.length > 0) inputs[0].focus();
    updateButtonUI();
}

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (!/^[0-9]$/.test(input.value)) {
            input.value = '';
            updateButtonUI();
            return;
        }

        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        updateButtonUI();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (!input.value && index > 0) {
                inputs[index - 1].focus();
            }
            setTimeout(updateButtonUI, 10);
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const finalPin = getPinString();

    if (finalPin.length !== 4) {
        errorMsg.textContent = "Please fill in all 4 digits.";
        inputRow.classList.add('shake');
        setTimeout(() => inputRow.classList.remove('shake'), 400);
        return;
    }
    async function checkMPIN() {
        if (finalPin === '7763') {
            errorMsg.style.color = "blue";
            errorMsg.textContent = "Login successful!"
            await new Promise(r => setTimeout(r, 2000));
            window.location.href = "https://champ.brightchamps.com/my-feed/?studentId=2226556";
        } else {
            errorMsg.textContent = "Incorrect MPIN. Please try again.";
            inputRow.classList.add('shake');
            setTimeout(() => inputRow.classList.remove('shake'), 400);
            clearInputs();
        }
    }
    checkMPIN()
});
