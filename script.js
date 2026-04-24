(function () {
  var palavras = [
    { palavra: 'ANDROID', dica: 'Sistema operacional do aparelho' },
    { palavra: 'CONTROLE', dica: 'Você usa para navegar na TV' },
    { palavra: 'TELEVISAO', dica: 'Aparelho de 32 polegadas' },
    { palavra: 'BLUETOOTH', dica: 'Conexão sem fio comum em acessórios' },
    { palavra: 'STREAMING', dica: 'Tipo de serviço de vídeo online' },
    { palavra: 'APLICATIVO', dica: 'Programa instalado no dispositivo' },
    { palavra: 'WI-FI', dica: 'Rede sem fio da casa' },
    { palavra: 'FILME', dica: 'Conteúdo para assistir' }
  ];

  var asciiEstados = [
    ' +---+\n |   |\n     |\n     |\n     |\n     |\n=======',
    ' +---+\n |   |\n O   |\n     |\n     |\n     |\n=======',
    ' +---+\n |   |\n O   |\n |   |\n     |\n     |\n=======',
    ' +---+\n |   |\n O   |\n/|   |\n     |\n     |\n=======',
    ' +---+\n |   |\n O   |\n/|\\  |\n     |\n     |\n=======',
    ' +---+\n |   |\n O   |\n/|\\  |\n/    |\n     |\n=======',
    ' +---+\n |   |\n O   |\n/|\\  |\n/ \\  |\n     |\n======='
  ];

  var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var maxErros = asciiEstados.length - 1;

  var estado = {
    palavraAtual: '',
    dicaAtual: '',
    letrasTentadas: {},
    erros: 0,
    wins: 0,
    losses: 0,
    terminou: false,
    focoIndex: 0
  };

  var elWord = document.getElementById('word');
  var elHint = document.getElementById('hint');
  var elStatus = document.getElementById('status');
  var elAscii = document.getElementById('hangmanAscii');
  var elKeyboard = document.getElementById('keyboard');
  var elWins = document.getElementById('wins');
  var elLosses = document.getElementById('losses');
  var newGameBtn = document.getElementById('newGameBtn');

  function escolherPalavra() {
    var idx = Math.floor(Math.random() * palavras.length);
    return palavras[idx];
  }

  function criarTeclado() {
    elKeyboard.innerHTML = '';

    for (var i = 0; i < letras.length; i += 1) {
      var letra = letras[i];
      var btn = document.createElement('button');
      btn.className = 'key';
      btn.textContent = letra;
      btn.setAttribute('type', 'button');
      btn.setAttribute('data-index', String(i));
      btn.setAttribute('aria-label', 'Letra ' + letra);

      btn.addEventListener('click', function (ev) {
        tentarLetra(ev.target.textContent);
      });

      elKeyboard.appendChild(btn);
    }

    atualizarFoco(0);
  }

  function atualizarFoco(novoIndice) {
    var botoes = elKeyboard.querySelectorAll('.key');
    if (!botoes.length) {
      return;
    }

    if (novoIndice < 0) novoIndice = 0;
    if (novoIndice >= botoes.length) novoIndice = botoes.length - 1;

    estado.focoIndex = novoIndice;

    for (var i = 0; i < botoes.length; i += 1) {
      botoes[i].classList.remove('focus');
    }

    botoes[novoIndice].classList.add('focus');
    botoes[novoIndice].focus();
  }

  function palavraRenderizada() {
    var chars = estado.palavraAtual.split('');
    var out = [];

    for (var i = 0; i < chars.length; i += 1) {
      var c = chars[i];
      if (c === '-' || c === ' ') {
        out.push(c);
      } else if (estado.letrasTentadas[c]) {
        out.push(c);
      } else {
        out.push('_');
      }
    }

    return out.join(' ');
  }

  function venceu() {
    for (var i = 0; i < estado.palavraAtual.length; i += 1) {
      var c = estado.palavraAtual.charAt(i);
      if (c === '-' || c === ' ') continue;
      if (!estado.letrasTentadas[c]) return false;
    }
    return true;
  }

  function atualizarUI() {
    elHint.textContent = 'Dica: ' + estado.dicaAtual;
    elWord.textContent = palavraRenderizada();
    elAscii.textContent = asciiEstados[estado.erros];
    elWins.textContent = String(estado.wins);
    elLosses.textContent = String(estado.losses);
  }

  function finalizarJogo(vitoria) {
    estado.terminou = true;

    var mensagem;
    if (vitoria) {
      estado.wins += 1;
      mensagem = 'Parabéns! Você venceu. Pressione "Nova palavra" para jogar novamente.';
    } else {
      estado.losses += 1;
      mensagem = 'Fim de jogo! A palavra era "' + estado.palavraAtual + '".';
    }

    elStatus.textContent = mensagem;
    atualizarUI();
  }

  function tentarLetra(letra) {
    if (estado.terminou) return;
    if (!letra || estado.letrasTentadas[letra]) return;

    estado.letrasTentadas[letra] = true;

    var botoes = elKeyboard.querySelectorAll('.key');
    for (var i = 0; i < botoes.length; i += 1) {
      if (botoes[i].textContent === letra) {
        if (estado.palavraAtual.indexOf(letra) >= 0) {
          botoes[i].classList.add('correct');
        } else {
          botoes[i].classList.add('wrong');
          estado.erros += 1;
        }
        botoes[i].disabled = true;
      }
    }

    if (venceu()) {
      finalizarJogo(true);
      return;
    }

    if (estado.erros >= maxErros) {
      finalizarJogo(false);
      return;
    }

    elStatus.textContent = 'Boa! Continue adivinhando.';
    atualizarUI();
  }

  function novoJogo() {
    var sorteio = escolherPalavra();
    estado.palavraAtual = sorteio.palavra;
    estado.dicaAtual = sorteio.dica;
    estado.letrasTentadas = {};
    estado.erros = 0;
    estado.terminou = false;

    criarTeclado();
    elStatus.textContent = 'Use o controle remoto (setas + OK) ou teclado.';
    atualizarUI();
  }

  function tratarNavegacaoRemoto(ev) {
    var key = ev.key;
    var botoes = elKeyboard.querySelectorAll('.key');
    if (!botoes.length) return;

    var cols = 7;
    var novo = estado.focoIndex;

    if (key === 'ArrowRight') {
      novo += 1;
    } else if (key === 'ArrowLeft') {
      novo -= 1;
    } else if (key === 'ArrowDown') {
      novo += cols;
    } else if (key === 'ArrowUp') {
      novo -= cols;
    } else if (key === 'Enter' || key === 'OK' || key === ' ') {
      botoes[estado.focoIndex].click();
      ev.preventDefault();
      return;
    } else {
      return;
    }

    if (novo < 0) novo = 0;
    if (novo >= botoes.length) novo = botoes.length - 1;

    atualizarFoco(novo);
    ev.preventDefault();
  }

  document.addEventListener('keydown', tratarNavegacaoRemoto);
  newGameBtn.addEventListener('click', novoJogo);

  novoJogo();
})();
