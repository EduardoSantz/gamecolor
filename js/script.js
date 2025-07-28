// Aguarda o carregamento completo do DOM para iniciar
document.addEventListener('DOMContentLoaded', () => {

    // --- Agrupamento de Elementos do DOM ---
    const ui = {
        screens: {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen'),
        },
        buttons: {
            start: document.getElementById('start-button'),
            restart: document.getElementById('restart-button'),
        },
        inputs: {
            playerName: document.getElementById('player-name-input'),
        },
        displays: {
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            targetColor: document.getElementById('target-color'),
            gameGrid: document.getElementById('game-grid'),
            finalScore: document.getElementById('final-score'),
            playerNameFinal: document.getElementById('player-name-final'),
        },
        rankings: {
            start: document.getElementById('ranking-list-start'),
            end: document.getElementById('ranking-list-end'),
        }
    };

    // --- Estado e Configurações do Jogo ---
    const state = {
        score: 0,
        timer: 60,
        timerInterval: null,
        playerName: '',
    };
    
    const config = {
        gameTime: 60,
        pointsPerCorrect: 10,
        pointsPerIncorrect: 5,
        colors: {
            '#FF5733': 'Laranja', '#33FF57': 'Verde', '#3357FF': 'Azul',
            '#FF33A1': 'Rosa',   '#A133FF': 'Roxo',  '#FFFF33': 'Amarelo',
            '#33FFFF': 'Ciano',  '#FF3333': 'Vermelho','#4F4F4F': 'Cinza'
        }
    };
    const colorHexCodes = Object.keys(config.colors);

    // --- Funções Auxiliares ---

    /**
     * Alterna a visibilidade das telas do jogo.
     * @param {string} screenName - O nome da tela a ser exibida ('start', 'game', 'end').
     */
    function switchScreen(screenName) {
        Object.values(ui.screens).forEach(screen => screen.classList.add('hidden'));
        ui.screens[screenName]?.classList.remove('hidden');
    }

    /**
     * Calcula uma cor de fundo contrastante para o texto da cor alvo.
     * @param {string} hex - O código hexadecimal da cor do texto.
     * @returns {string} - Retorna '#333' (escuro) ou '#FFF' (claro).
     */
    function getContrastingBg(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#333' : '#FFF';
    }
    
    // --- Funções de Ranking ---

    /**
     * Exibe o ranking dos jogadores nas listas.
     */
    function displayRanking() {
        const ranking = JSON.parse(localStorage.getItem('colorChallengeRanking')) || [];
        
        ui.rankings.start.innerHTML = '';
        ui.rankings.end.innerHTML = '';
        
        if (ranking.length === 0) {
            const noDataMsg = '<li>Ainda não há pontuações. Seja o primeiro!</li>';
            ui.rankings.start.innerHTML = noDataMsg;
            ui.rankings.end.innerHTML = noDataMsg;
            return;
        }

        const rankingHtml = ranking.map(player => `<li>${player.name} - ${player.score} pontos</li>`).join('');
        ui.rankings.start.innerHTML = rankingHtml;
        ui.rankings.end.innerHTML = rankingHtml;
    }

    /**
     * Atualiza o ranking com o resultado do jogo atual e o exibe.
     */
    function updateAndDisplayRanking() {
        const ranking = JSON.parse(localStorage.getItem('colorChallengeRanking')) || [];
        ranking.push({ name: state.playerName, score: state.score });
        ranking.sort((a, b) => b.score - a.score);
        const top5 = ranking.slice(0, 5);
        localStorage.setItem('colorChallengeRanking', JSON.stringify(top5));
        displayRanking();
    }

    // --- Funções Principais do Jogo ---

    /**
     * Gera um novo desafio, preenchendo o grid com cores.
     */
    function generateChallenge() {
        ui.displays.gameGrid.innerHTML = '';

        const gridColors = [...colorHexCodes].sort(() => 0.5 - Math.random()).slice(0, 9);
        const targetHex = gridColors[Math.floor(Math.random() * gridColors.length)];
        const targetName = config.colors[targetHex];
        
        ui.displays.targetColor.textContent = targetName;
        ui.displays.targetColor.style.color = targetHex;
        ui.displays.targetColor.style.backgroundColor = getContrastingBg(targetHex);

        gridColors.forEach(hex => {
            const square = document.createElement('div');
            square.className = 'color-square';
            square.style.backgroundColor = hex;
            square.dataset.hex = hex;
            square.addEventListener('click', handleColorClick);
            ui.displays.gameGrid.appendChild(square);
        });
    }

    /**
     * Lida com o clique em um quadrado de cor.
     * @param {Event} event
     */
    function handleColorClick(event) {
        const clickedHex = event.target.dataset.hex;
        const targetName = ui.displays.targetColor.textContent;
        const targetHex = Object.keys(config.colors).find(hex => config.colors[hex] === targetName);

        if (clickedHex === targetHex) {
            state.score += config.pointsPerCorrect;
        } else {
            state.score = Math.max(0, state.score - config.pointsPerIncorrect);
        }

        ui.displays.score.textContent = state.score;
        generateChallenge();
    }


    /**
     * Finaliza a partida atual.
     */
    function endGame() {
        clearInterval(state.timerInterval);
        
        ui.displays.playerNameFinal.textContent = state.playerName;
        ui.displays.finalScore.textContent = state.score;
        
        updateAndDisplayRanking();
        switchScreen('end');
    }

    /**
     * Inicia uma nova partida.
     */
    function startGame() {
        state.playerName = ui.inputs.playerName.value.trim();
        if (!state.playerName) {
            alert('Por favor, digite seu nome para começar!');
            return;
        }

        state.score = 0;
        state.timer = config.gameTime;
        ui.displays.score.textContent = state.score;
        ui.displays.timer.textContent = state.timer;

        state.timerInterval = setInterval(() => {
            state.timer--;
            ui.displays.timer.textContent = state.timer;
            if (state.timer <= 0) {
                endGame();
            }
        }, 1000);

        switchScreen('game');
        generateChallenge();
    }
    
    // --- Inicialização ---

    /**
     * Adiciona os event listeners e prepara o estado inicial.
     */
    function initialize() {
        ui.buttons.start.addEventListener('click', startGame);
        ui.buttons.restart.addEventListener('click', () => {
            switchScreen('start');
            displayRanking(); // Garante que o ranking na tela inicial está atualizado
        });
        displayRanking(); // Exibe o ranking inicial ao carregar a página
    }

    initialize();
});
