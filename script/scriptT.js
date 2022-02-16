const LINKGENERAL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let IDQUIZZ = "";
let promise = axios.get(LINKGENERAL);
promise.then(renderQuizzes);
function renderQuizzes(quizz) {
    data = quizz.data;
    title = data.title;
    image = data.image;
    const quizzListHTML = document.querySelector("section");
    quizzListHTML.innerHTML = "";
    for (i = 0; i < data.length; i++) {
        quizzListHTML.innerHTML += `
        <article class="quizz-on-screen">
            <img class="fundo" src="${data[i].image}" alt="">
            <h3>${data[i].title}</h3>
        </article>
        `
    }
    console.log(data);
}



// LISTA DE TELAS //

let telaPrincipal = document.querySelector(".tela-principal");
let tela8 = document.querySelector(".tela-8");
let tela9 = document.querySelector(".tela-9");

// VARIAVEIS //
let informacoesBasicas = document.querySelectorAll(".tela-8 .container input");
let tituloQuizz;
let urlImagemQuizz;
let quantidadeDePerguntas;
let nivelQuizz;

let perguntasDoQuizz = document.querySelectorAll(".tela-9 .container");
let textoDaPergunta;
let corDeFundo;
let respostaCorreta;
let urlImagemCorreta;
let respostaIncorreta;
let urlImagemIncorreta;

// FUNÇÕES //
function createQuiz() {
    telaPrincipal.classList.add("hide");
    tela8.classList.remove("hide");
}
function validarInformacoes() {
    tituloQuizz = informacoesBasicas[0].value;
    urlImagemQuizz = informacoesBasicas[1].value;
    quantidadeDePerguntas = informacoesBasicas[2].value;
    nivelQuizz = informacoesBasicas[3].value;
    let requisitosAtendidos = 0;
    let linkSeguro = "";

    if(tituloQuizz.length >= 20 && tituloQuizz.length < 65) {
        requisitosAtendidos += 1;
    } if (quantidadeDePerguntas >= 3) {
        requisitosAtendidos += 1;
    } if (nivelQuizz >= 2) {
        requisitosAtendidos += 1;
    } if (urlImagemQuizz.length >= 5) {
        for (let i = 0; i < 5; i++) {
            linkSeguro += urlImagemQuizz[i];
            if (linkSeguro == "https") {
                requisitosAtendidos += 1;
            }
        }
    }

    // if (requisitosAtendidos == 4) {
    //     proximaTela()
    // } else {
    //     alert("Preencha corretamente todas as informações para prosseguir")
    // } 
    criarPerguntas()
}
function criarPerguntas() {
    tela8.classList.add("hide")
    tela9.classList.remove("hide")
    
    let tela_9 = document.querySelector(".tela-9")
    tela_9.innerHTML = `
        <h1>Crie suas perguntas</h1>
        <div class="container">
            <h2>Pergunta 1</h2>
            <input type="text" placeholder="Texto da pergunta">
            <input type="text" placeholder="Cor de fundo da pergunta">
            <h2>Resposta correta</h2>
            <div class="respostaCorreta">
                <div class="resposta">
                    <input type="text" placeholder="Resposta correta">
                    <input type="text" placeholder="URL da imagem">
                </div>
            </div>
            <h2>Respostas incorretas</h2>
            <div class="respostasIncorretas">
                <div class="resposta">
                    <input type="text" placeholder="Resposta incorreta 1">
                    <input type="text" placeholder="URL da imagem 1">
                </div>
                <div class="resposta">
                    <input type="text" placeholder="Resposta incorreta 2">
                    <input type="text" placeholder="URL da imagem 2">
                </div>
                <div class="resposta">
                    <input type="text" placeholder="Resposta incorreta 3">
                    <input type="text" placeholder="URL da imagem 3">
                </div>
            </div>
        </div>`
        for (let i = 1; i < quantidadeDePerguntas; i++) {
        tela_9.innerHTML += `
        <div class="container">
            <h2>Pergunta ${i + 1}</h2>
        </div>`
    }
    tela_9.innerHTML += `<button onclick="validarPerguntas()"">Prosseguir pra criar perguntas</button>`
}
function validarPerguntas() {
    // textoDaPergunta = perguntasDoQuizz[0].value
    // corDeFundo = perguntasDoQuizz[1].value
    // respostaCorreta = perguntasDoQuizz[2].value
    // urlImagemCorreta = perguntasDoQuizz[3].value
    // respostaIncorreta = perguntasDoQuizz[4].value
    // urlImagemIncorreta = perguntasDoQuizz[5].value

    // console.log(textoDaPergunta)
}