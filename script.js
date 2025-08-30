document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const formsSection = document.getElementById('forms-section');
    const dashboard = document.getElementById('dashboard');
    const toggleFormButton = document.getElementById('toggle-form-button');
    const logoutButton = document.getElementById('logout-button');
    const nequiBalanceDisplay = document.getElementById('nequi-balance');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const menuIcon = document.getElementById('menu-icon');

    // Elementos del juego principal
    const rollButton = document.getElementById('roll-button');
    const balanceDisplay = document.querySelector('.balance');
    const gameResultDisplay = document.getElementById('game-result');
    const countdownTimer = document.querySelector('.countdown-timer');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');

    // Elementos del formulario de registro
    const regEmailRadio = document.getElementById('reg-email');
    const regPhoneRadio = document.getElementById('reg-phone');
    const emailGroup = document.getElementById('email-group');
    const phoneGroup = document.getElementById('phone-group');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Elementos de audio
    const spinSound = document.getElementById('spin-sound');
    const notificationSound = document.getElementById('notification-sound');
    const hiloSound = document.getElementById('hilo-sound');

    // Elementos de los modals
    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const depositModal = document.getElementById('deposit-modal');
    const withdrawModal = document.getElementById('withdraw-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');
    const depositForm = document.getElementById('deposit-form');
    const withdrawForm = document.getElementById('withdraw-form');

    // Nuevos elementos del menú y del juego Hi-Lo
    const multiplyButton = document.getElementById('multiply-button');
    const hiLoGameSection = document.getElementById('hi-lo-game');
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');

    // Saldo inicial del usuario (simulado)
    let userBalance = 0;

    // Funcionalidad del menú desplegable
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            dropdownMenu.classList.toggle('active');
        });
    }

    // Cerrar el menú al hacer clic en un enlace del menú
    dropdownMenu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        if (!dropdownMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Función para alternar entre los formularios de registro y login
    toggleFormButton.addEventListener('click', function() {
      if (signupForm.style.display === 'none') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        toggleFormButton.textContent = 'ACCESO';
      } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        toggleFormButton.textContent = 'INSCRIBIRSE';
      }
    });

    // Lógica para mostrar/ocultar los campos de registro
    regEmailRadio.addEventListener('change', () => {
      emailGroup.style.display = 'block';
      phoneGroup.style.display = 'none';
      phoneInput.removeAttribute('required');
      emailInput.setAttribute('required', 'required');
    });

    regPhoneRadio.addEventListener('change', () => {
      phoneGroup.style.display = 'block';
      emailGroup.style.display = 'none';
      emailInput.removeAttribute('required');
      phoneInput.setAttribute('required', 'required');
    });

    // Simular el registro y redirigir al dashboard
    document.getElementById('signup-form-element').addEventListener('submit', function(event) {
      event.preventDefault();

      let contactInfo;
      if (regEmailRadio.checked) {
        contactInfo = emailInput.value;
      } else {
        contactInfo = document.getElementById('country-code').value + ' ' + phoneInput.value;
      }

      if (contactInfo) {
        alert(`¡Registro exitoso! Redirigiendo a la página principal.`);
        formsSection.style.display = 'none';
        dashboard.style.display = 'block';
        logoutButton.style.display = 'block';
        multiplyButton.style.display = 'block';
        updateBalanceDisplay();
      } else {
        alert('Por favor, ingresa tu información de contacto.');
      }
    });

    // Simular el inicio de sesión y redirigir al dashboard
    document.getElementById('login-form-element').addEventListener('submit', function(event) {
      event.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      if (email && password) {
        alert(`¡Inicio de sesión exitoso! Redirigiendo a la página principal.`);
        formsSection.style.display = 'none';
        dashboard.style.display = 'block';
        logoutButton.style.display = 'block';
        multiplyButton.style.display = 'block';
        updateBalanceDisplay();
      } else {
        alert('Por favor, ingresa tu correo y contraseña.');
      }
    });

    // Funcionalidad para cerrar la caja de notificación
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
      });
    }

    // Funcionalidad de cerrar sesión
    logoutButton.addEventListener('click', function() {
      dashboard.style.display = 'none';
      hiLoGameSection.style.display = 'none';
      formsSection.style.display = 'block';
      this.style.display = 'none';
      multiplyButton.style.display = 'none';
      
      // Reiniciar el saldo y el estado del juego
      userBalance = 0;
      updateBalanceDisplay();
      
      // Detener temporizador
      clearInterval(timerInterval);
      rollButton.disabled = false;
      countdownTimer.style.display = 'none';
    });


    // Función para actualizar el saldo en pantalla, en ambos lugares
    function updateBalanceDisplay() {
        const formattedBalance = `$ ${userBalance.toFixed(2)} COP`;
        if (balanceDisplay) balanceDisplay.textContent = formattedBalance;
        if (nequiBalanceDisplay) nequiBalanceDisplay.textContent = formattedBalance;
    }

    // Lógica del juego principal
    rollButton.addEventListener('click', function() {
      rollButton.disabled = true;

      spinSound.play();
      setTimeout(() => {
        spinSound.pause();
        spinSound.currentTime = 0;
      }, 1000);

      const randomNumber = Math.floor(Math.random() * 10001);
      let prize = 0;

      if (randomNumber >= 0 && randomNumber <= 9885) {
        prize = 200;
      } else if (randomNumber >= 9886 && randomNumber <= 9985) {
        prize = 1000;
      } else if (randomNumber >= 9986 && randomNumber <= 9993) {
        prize = 5000;
      } else if (randomNumber >= 9994 && randomNumber <= 9997) {
        prize = 20000;
      } else if (randomNumber >= 9998 && randomNumber <= 9999) {
        prize = 50000;
      } else if (randomNumber === 10000) {
        prize = 100000;
      }

      userBalance += prize;
      updateBalanceDisplay();

      gameResultDisplay.innerHTML = `<p>Tu número de la suerte es: <strong>${randomNumber}</strong></p><p>¡Ganaste <strong>$${prize} COP</strong>!</p>`;

      startCountdown(3600);
    });

    // Lógica del temporizador de cuenta atrás
    let timerInterval;

    function startCountdown(seconds) {
        countdownTimer.style.display = 'block';
        let duration = seconds;

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;

            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');

            if (--duration < 0) {
                clearInterval(timerInterval);
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                rollButton.disabled = false;
                countdownTimer.style.display = 'none';
                gameResultDisplay.textContent = '¡Ya puedes volver a jugar!';
            }
        }, 1000);
    }

    // Funcionalidad de los modals
    depositBtn.addEventListener('click', () => {
        depositModal.style.display = 'block';
    });

    withdrawBtn.addEventListener('click', () => {
        withdrawModal.style.display = 'block';
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === depositModal) {
            depositModal.style.display = 'none';
        }
        if (event.target === withdrawModal) {
            withdrawModal.style.display = 'none';
        }
    });

    depositForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = document.getElementById('deposit-amount').value;
        alert(`¡Solicitud de depósito de $${amount} COP enviada! Tu saldo se actualizará pronto.`);
        depositModal.style.display = 'none';
        depositForm.reset();
    });

    withdrawForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('withdraw-amount').value);
        const nequiNumber = document.getElementById('withdraw-nequi').value;
        if (amount > userBalance) {
            alert('No tienes suficientes fondos para realizar este retiro.');
        } else {
            alert(`¡Solicitud de retiro de $${amount} COP a ${nequiNumber} enviada! Tu saldo se actualizará pronto.`);
            userBalance -= amount;
            updateBalanceDisplay();
            withdrawModal.style.display = 'none';
            withdrawForm.reset();
        }
    });

    // Lógica del juego Hi-Lo
    function generateNewHiloNumber() {
        return Math.floor(Math.random() * 10000) + 1;
    }

    function startHiLoGame() {
        hiLoGameSection.style.display = 'block';
        dashboard.style.display = 'none';

        const currentNumberDisplay = document.getElementById('current-number');
        const hiButton = document.getElementById('hi-button');
        const loButton = document.getElementById('lo-button');
        const hiloResultDisplay = document.getElementById('hilo-result');
        const betOptions = document.querySelectorAll('input[name="bet-option"]');
        const normalBetSection = document.getElementById('normal-bet-section');
        const normalBetAmountInput = document.getElementById('normal-bet-amount');
        const betIncreaseBtn = document.getElementById('bet-increase');
        const betDecreaseBtn = document.getElementById('bet-decrease');

        const initialNumber = Math.floor(Math.random() * 10000) + 1;
        currentNumberDisplay.textContent = String(initialNumber).padStart(5, '0');
        hiloResultDisplay.textContent = '';

        if (hiButton) hiButton.addEventListener('click', () => handleHiloGuess('hi'));
        if (loButton) loButton.addEventListener('click', () => handleHiloGuess('lo'));
        
        betOptions.forEach(option => {
            option.addEventListener('change', () => {
                if (option.id === 'bet-normal') {
                    normalBetSection.style.display = 'block';
                } else {
                    normalBetSection.style.display = 'none';
                }
            });
        });
        
        if (betIncreaseBtn) {
            betIncreaseBtn.addEventListener('click', () => {
                let currentAmount = parseInt(normalBetAmountInput.value);
                normalBetAmountInput.value = currentAmount + 10;
            });
        }

        if (betDecreaseBtn) {
            betDecreaseBtn.addEventListener('click', () => {
                let currentAmount = parseInt(normalBetAmountInput.value);
                if (currentAmount > 50) {
                    normalBetAmountInput.value = currentAmount - 10;
                }
            });
        }

        function handleHiloGuess(guess) {
            const selectedBetOption = document.querySelector('input[name="bet-option"]:checked');
            const isNormalBet = selectedBetOption.id === 'bet-normal';

            hiloSound.play();
            setTimeout(() => {
                hiloSound.pause();
                hiloSound.currentTime = 0;
            }, 1000);

            const nextNumber = generateNewHiloNumber();
            let isCorrect = false;
            let winMessage = '';
            let winAmount = 0;
            let betCost = 0;
            
            if (!isNormalBet) {
                betCost = parseFloat(selectedBetOption.dataset.cost);

                if (betCost > userBalance) {
                    hiloResultDisplay.textContent = '¡No tienes suficiente saldo para esta apuesta!';
                    return;
                }
                
                userBalance -= betCost;
                updateBalanceDisplay();

                if (nextNumber === 8888) {
                    isCorrect = true;
                    if (betCost === 5000) {
                        winAmount = 10000;
                    } else if (betCost === 500) {
                        winAmount = 1000;
                    } else if (betCost === 50) {
                        winAmount = 100;
                    } else if (betCost === 25) {
                        winAmount = 50;
                    }

                    winMessage = `¡JACKPOT! Sacaste el número 8888 y ganaste $${winAmount} COP.`;
                    notificationSound.play();
                } else {
                    if (guess === 'hi' && nextNumber > 5250) {
                        isCorrect = true;
                        winAmount = betCost * 2;
                        winMessage = `¡Ganaste! El número era ${String(nextNumber).padStart(5, '0')}. Ganas $${winAmount} COP.`;
                    } else if (guess === 'lo' && nextNumber < 4750) {
                        isCorrect = true;
                        winAmount = betCost * 2;
                        winMessage = `¡Ganaste! El número era ${String(nextNumber).padStart(5, '0')}. Ganas $${winAmount} COP.`;
                    } else {
                        winMessage = `¡Perdiste! El número era ${String(nextNumber).padStart(5, '0')}. Pierdes $${betCost} COP.`;
                    }
                }
            } else {
                betCost = parseFloat(normalBetAmountInput.value);
                if (betCost > userBalance) {
                     hiloResultDisplay.textContent = '¡No tienes suficiente saldo para esta apuesta!';
                     return;
                }
                
                userBalance -= betCost;
                updateBalanceDisplay();

                if (guess === 'hi' && nextNumber > 5250) {
                    isCorrect = true;
                    winAmount = betCost * 2;
                    winMessage = `¡Ganaste! El número era ${String(nextNumber).padStart(5, '0')}. Ganas $${winAmount} COP.`;
                } else if (guess === 'lo' && nextNumber < 4750) {
                    isCorrect = true;
                    winAmount = betCost * 2;
                    winMessage = `¡Ganaste! El número era ${String(nextNumber).padStart(5, '0')}. Ganas $${winAmount} COP.`;
                } else {
                    winMessage = `¡Perdiste! El número era ${String(nextNumber).padStart(5, '0')}. Pierdes $${betCost} COP.`;
                }
            }

            if (isCorrect) {
                userBalance += winAmount;
            }
            
            hiloResultDisplay.textContent = winMessage;
            currentNumberDisplay.textContent = String(nextNumber).padStart(5, '0');
            updateBalanceDisplay();
        }
    }

    multiplyButton.addEventListener('click', () => {
        startHiLoGame();
    });

    backToDashboardBtn.addEventListener('click', () => {
        hiLoGameSection.style.display = 'none';
        dashboard.style.display = 'block';
        const hiloResultDisplay = document.getElementById('hilo-result');
        if (hiloResultDisplay) {
             hiloResultDisplay.textContent = '';
        }
    });
});