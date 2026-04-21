/* =========================================
   ELEMENTOS DO HTML
   Aqui peguei os elementos que serão manipulados no DOM
========================================= */
const btnAdicionar = document.getElementById("btnAdicionar");
const btnReiniciar = document.getElementById("btnReiniciar");
const listaFibonacci = document.getElementById("listaFibonacci");
const canvas = document.getElementById("canvasEspiral");
const ctx = canvas.getContext("2d");

/* =========================================
   ESTADO DA APLICAÇÃO
   Guardei a sequência em um array
========================================= */
let sequencia = [];

/* =========================================
   FUNÇÃO: salvarSequencia
   Guarda a sequência no navegador para não perder ao recarregar
========================================= */
function salvarSequencia() {
    localStorage.setItem("sequenciaFibonacci", JSON.stringify(sequencia));
}

/* =========================================
   FUNÇÃO: carregarSequencia
   Recupera a sequência salva no navegador ao abrir a página
========================================= */
function carregarSequencia() {
    const dadosSalvos = localStorage.getItem("sequenciaFibonacci");

    if (dadosSalvos) {
        sequencia = JSON.parse(dadosSalvos);
        atualizarTela();
    }
}

/* =========================================
   FUNÇÃO: adicionarNumero
   Adiciona o próximo número da sequência de Fibonacci
========================================= */
function adicionarNumero() {
    if (sequencia.length === 0) {
        sequencia.push(0);
    } else if (sequencia.length === 1) {
        sequencia.push(1);
    } else {
        const penultimo = sequencia[sequencia.length - 2];
        const ultimo = sequencia[sequencia.length - 1];
        const proximo = penultimo + ultimo;
        sequencia.push(proximo);
    }

    salvarSequencia();
    atualizarTela();
}

/* =========================================
   FUNÇÃO: reiniciarSequencia
   Limpa a sequência atual, apaga o localStorage e atualiza a tela
========================================= */
function reiniciarSequencia() {
    sequencia = [];
    localStorage.removeItem("sequenciaFibonacci");
    atualizarTela();
}

/* =========================================
   FUNÇÃO: atualizarTela
   Atualiza a exibição da sequência numérica e o desenho no canvas
========================================= */
function atualizarTela() {
    listaFibonacci.innerHTML = "";

    sequencia.forEach((numero) => {
        const item = document.createElement("div");
        item.classList.add("numero");
        item.textContent = numero;
        listaFibonacci.appendChild(item);
    });

    desenharEspiral();
}

/* =========================================
   FUNÇÃO: desenharEspiral
   Desenha a espiral de Fibonacci no canvas com base na sequência atual
========================================= */
function desenharEspiral() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (sequencia.length < 2) return;

    let x = canvas.width / 2;
    let y = canvas.height / 2;

    const escala = 6;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 0; i < sequencia.length; i++) {
        const tamanho = sequencia[i] * escala;

        if (i % 4 === 0) {
            x += tamanho;
        } else if (i % 4 === 1) {
            y -= tamanho;
        } else if (i % 4 === 2) {
            x -= tamanho;
        } else {
            y += tamanho;
        }

        ctx.lineTo(x, y);
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#111";
    ctx.stroke();
}

/* =========================================
   EVENTOS
   Define o que acontece ao clicar em cada botão
========================================= */
btnAdicionar.addEventListener("click", adicionarNumero);
btnReiniciar.addEventListener("click", reiniciarSequencia);

/* =========================================
   INICIALIZAÇÃO
   Quando a página abre, tenta carregar os dados salvos
========================================= */
carregarSequencia();