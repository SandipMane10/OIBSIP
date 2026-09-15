    const celsiusInput = document.getElementById('celsius');
    const fahrenheitInput = document.getElementById('fahrenheit');
    const kelvinInput = document.getElementById('kelvin');
    const errorDiv = document.getElementById('error');
    const statusDiv = document.getElementById('status');

    const ABSOLUTE_ZERO = {
        celsius: -273.15,
        fahrenheit: -459.67,
        kelvin: 0
    };

    function clearInputsExcept(activeInput) {
        if (activeInput !== celsiusInput) celsiusInput.value = '';
        if (activeInput !== fahrenheitInput) fahrenheitInput.value = '';
        if (activeInput !== kelvinInput) kelvinInput.value = '';
        statusDiv.className = 'status-badge';
        statusDiv.textContent = 'Enter a temperature';
    }

    function updateThermalStatus(celsiusVal) {
        statusDiv.className = 'status-badge';

        if (celsiusVal <= 0) {
            statusDiv.classList.add('status-freezing');
            statusDiv.textContent = 'Freezing Point or Below ❄️';
        } else if (celsiusVal > 0 && celsiusVal <= 30) {
            statusDiv.classList.add('status-comfortable');
            statusDiv.textContent = 'Comfortable / Room Temp 😊';
        } else if (celsiusVal > 30 && celsiusVal < 100) {
            statusDiv.classList.add('status-hot');
            statusDiv.textContent = 'Hot ☀️';
        } else {
            statusDiv.classList.add('status-boiling');
            statusDiv.textContent = 'Boiling Point or Above 🔥';
        }
    }

    function convertTemperature(e) {
        const value = parseFloat(e.target.value);
        const inputId = e.target.id;

        errorDiv.textContent = '';

        if (isNaN(value)) {
            clearInputsExcept(null);
            return;
        }

        if (value < ABSOLUTE_ZERO[inputId]) {
            errorDiv.textContent = `Temperature cannot be below Absolute Zero (${ABSOLUTE_ZERO[inputId]} ${inputId === 'kelvin' ? 'K' : '°' + inputId.charAt(0).toUpperCase()})`;
            clearInputsExcept(e.target);
            return;
        }

        let c, f, k;

        if (inputId === 'celsius') {
            c = value;
            f = (c * 9/5) + 32;
            k = c + 273.15;
        } else if (inputId === 'fahrenheit') {
            f = value;
            c = (f - 32) * 5/9;
            k = c + 273.15;
        } else if (inputId === 'kelvin') {
            k = value;
            c = k - 273.15;
            f = (c * 9/5) + 32;
        }

        celsiusInput.value = inputId === 'celsius' ? value : parseFloat(c.toFixed(2));
        fahrenheitInput.value = inputId === 'fahrenheit' ? value : parseFloat(f.toFixed(2));
        kelvinInput.value = inputId === 'kelvin' ? value : parseFloat(k.toFixed(2));

        updateThermalStatus(c);
    }

    celsiusInput.addEventListener('input', convertTemperature);
    fahrenheitInput.addEventListener('input', convertTemperature);
    kelvinInput.addEventListener('input', convertTemperature);
