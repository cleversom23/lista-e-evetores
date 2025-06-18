// Array para armazenar os números
let numbersList = [];

// Elementos do DOM
const addButton = document.getElementById('addNumbers');
const clearButton = document.getElementById('clearList');
const numbersDisplay = document.getElementById('numbersList');

// Função para adicionar números à lista
function addNumbers() {
    // Efeito de loading no botão
    addButton.innerHTML = '<span class="loading">🌌</span> Processando...';
    addButton.disabled = true;
    
    // Simular delay para efeito visual
    setTimeout(() => {
        // Limpar a lista atual
        numbersList = [];
        
        // Obter os valores dos inputs
        const num1 = document.getElementById('num1').value;
        const num2 = document.getElementById('num2').value;
        const num3 = document.getElementById('num3').value;
        const num4 = document.getElementById('num4').value;
        const num5 = document.getElementById('num5').value;
        
        // Verificar se todos os campos estão preenchidos
        if (!num1 || !num2 || !num3 || !num4 || !num5) {
            showMessage('❌ Por favor, preencha todos os 5 campos com números!', 'error');
            resetButton();
            return;
        }
        
        // Converter para números e adicionar à lista
        numbersList.push(
            parseFloat(num1),
            parseFloat(num2),
            parseFloat(num3),
            parseFloat(num4),
            parseFloat(num5)
        );
        
        // Exibir os números com animação
        displayNumbersWithAnimation();
        
        // Limpar os campos de entrada
        clearInputs();
        
        // Mostrar mensagem de sucesso
        showMessage('✨ Números adicionados com sucesso!', 'success');
        
        // Resetar botão
        resetButton();
        
        // Efeito de estrelas cadentes
        createShootingStars();
        
    }, 800);
}

// Função para resetar o botão
function resetButton() {
    addButton.innerHTML = 'Adicionar Números';
    addButton.disabled = false;
}

// Função para exibir os números com animação
function displayNumbersWithAnimation() {
    if (numbersList.length === 0) {
        numbersDisplay.innerHTML = '<p class="empty-message">Nenhum número foi adicionado ainda.</p>';
        return;
    }
    
    let html = '';
    numbersList.forEach((number, index) => {
        html += `<span class="number-item" style="animation-delay: ${index * 0.1}s">${number}</span>`;
    });
    
    numbersDisplay.innerHTML = html;
    
    // Adicionar evento de clique nos números
    document.querySelectorAll('.number-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            showNumberDetails(number, index);
        });
    });
}

// Função para mostrar detalhes do número
function showNumberDetails(number, index) {
    const details = `
        <div class="number-details">
            <h3>🌠 Número ${index + 1}</h3>
            <p>Valor: <strong>${number}</strong></p>
            <p>Tipo: <strong>${Number.isInteger(number) ? 'Inteiro' : 'Decimal'}</strong></p>
            <p>Posição: <strong>${index + 1}º</strong></p>
        </div>
    `;
    
    showMessage(details, 'info', 5000);
}

// Função para exibir os números na tela (versão simples)
function displayNumbers() {
    if (numbersList.length === 0) {
        numbersDisplay.innerHTML = '<p class="empty-message">Nenhum número foi adicionado ainda.</p>';
        return;
    }
    
    let html = '';
    numbersList.forEach((number, index) => {
        html += `<span class="number-item">${number}</span>`;
    });
    
    numbersDisplay.innerHTML = html;
}

// Função para limpar a lista
function clearList() {
    // Efeito de fade out
    numbersDisplay.style.opacity = '0';
    numbersDisplay.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        numbersList = [];
        displayNumbers();
        clearInputs();
        showMessage('🌌 Lista limpa com sucesso!', 'info');
        
        // Efeito de fade in
        numbersDisplay.style.opacity = '1';
        numbersDisplay.style.transform = 'scale(1)';
    }, 300);
}

// Função para limpar os campos de entrada
function clearInputs() {
    const inputs = ['num1', 'num2', 'num3', 'num4', 'num5'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        input.value = '';
        input.style.transform = 'scale(0.95)';
        setTimeout(() => {
            input.style.transform = 'scale(1)';
        }, 150);
    });
}

// Função para criar estrelas cadentes
function createShootingStars() {
    const colors = ['#8a2be2', '#4b0082', '#9400d3', '#ffffff', '#87ceeb'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight * 0.3;
            const endX = startX + (Math.random() - 0.5) * 400;
            const endY = startY + 300;
            
            star.style.cssText = `
                position: fixed;
                top: ${startY}px;
                left: ${startX}px;
                width: 3px;
                height: 3px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 10px ${colors[Math.floor(Math.random() * colors.length)]};
                animation: shootingStar 2s linear forwards;
            `;
            
            // Adicionar cauda da estrela
            star.innerHTML = '<div style="position: absolute; top: 0; left: 0; width: 100px; height: 2px; background: linear-gradient(90deg, transparent, currentColor); transform: rotate(-45deg); transform-origin: left center;"></div>';
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 2000);
        }, i * 200);
    }
}

// Função para criar partículas espaciais
function createSpaceParticles() {
    const particles = ['⭐', '✨', '🌟', '💫', '🌠'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                top: ${Math.random() * window.innerHeight}px;
                left: ${Math.random() * window.innerWidth}px;
                font-size: ${Math.random() * 20 + 10}px;
                pointer-events: none;
                z-index: 9998;
                animation: spaceFloat 4s ease-in-out infinite;
                opacity: 0.7;
            `;
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 4000);
        }, i * 100);
    }
}

// Função para mostrar mensagens melhorada
function showMessage(message, type, duration = 3000) {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Criar elemento de mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = message;
    
    // Estilos da mensagem
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 25px;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(138, 43, 226, 0.3);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    `;
    
    // Cor baseada no tipo
    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #8a2be2 0%, #4b0082 100%)';
    } else if (type === 'info') {
        messageDiv.style.background = 'linear-gradient(135deg, #4b0082 0%, #9400d3 100%)';
    } else if (type === 'error') {
        messageDiv.style.background = 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
    }
    
    // Adicionar ao body
    document.body.appendChild(messageDiv);
    
    // Remover após o tempo especificado
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 400);
    }, duration);
}

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes shootingStar {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 400 - 200}px, 300px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes spaceFloat {
        0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.7; 
        }
        50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1; 
        }
    }
    
    .loading {
        animation: cosmicSpin 1s linear infinite;
    }
    
    @keyframes cosmicSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .number-details {
        text-align: left;
    }
    
    .number-details h3 {
        margin: 0 0 10px 0;
        font-size: 1.2em;
    }
    
    .number-details p {
        margin: 5px 0;
        font-size: 0.9em;
    }
    
    .numbers-display {
        transition: all 0.3s ease;
    }
    
    input[type="number"] {
        transition: all 0.3s ease;
    }
    
    /* Efeito de brilho cósmico */
    .container::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
        pointer-events: none;
        animation: cosmicGlow 4s ease-in-out infinite;
    }
    
    @keyframes cosmicGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }
`;
document.head.appendChild(style);

// Event listeners
addButton.addEventListener('click', addNumbers);
clearButton.addEventListener('click', clearList);

// Permitir adicionar números pressionando Enter em qualquer campo
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNumbers();
        }
    });
    
    // Efeito de foco melhorado
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        createSpaceParticles();
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Focar no primeiro campo quando a página carregar
window.addEventListener('load', () => {
    document.getElementById('num1').focus();
    
    // Animação de entrada da página
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.5s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
        
        // Criar partículas espaciais iniciais
        createSpaceParticles();
    }, 100);
});

// Efeito de hover nos botões
[addButton, clearButton].forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
        createSpaceParticles();
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Criar partículas espaciais periodicamente
setInterval(() => {
    if (Math.random() > 0.7) {
        createSpaceParticles();
    }
}, 5000); 