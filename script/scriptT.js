const LINKGENERAL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let IDQUIZZ = "";
let promise = axios.get(LINKGENERAL);
promise.then(renderQuizzes);
function renderQuizzes(quizz) {
    data = quizz.data;
    title = data.title;
    image = data.image;
    id = data.id;
    const quizzListHTML = document.querySelector("section");
    quizzListHTML.innerHTML = "";
    for (i = 0; i < data.length; i++) {
        quizzListHTML.innerHTML += `
        <article onclick = "intoQuizz(${data[i].id})" class="quizz-on-screen">
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
let tela10 = document.querySelector(".tela-10")
let tela11 = document.querySelector(".tela-11")
let onQuizz = document.querySelector(".on-quizz");

// VARIAVEIS //
let informacoesBasicas = document.querySelectorAll(".tela-8 .container input");
let tituloQuizz
let urlImagemQuizz
let quantidadeDePerguntas
let quantidadeNiveis


// FUNÇÕES //
function createQuiz() {
    telaPrincipal.classList.add("hide");
    tela8.classList.remove("hide");
}
function validarInformacoes() {
    tituloQuizz = informacoesBasicas[0].value;
    urlImagemQuizz = informacoesBasicas[1].value;
    quantidadeDePerguntas = informacoesBasicas[2].value;
    quantidadeNiveis = informacoesBasicas[3].value;

    let requisitosAtendidos = 0;
    let linkSeguro = "";
    
    if (tituloQuizz.length >= 20 && tituloQuizz.length < 65) {
        requisitosAtendidos += 1;
    } if (quantidadeDePerguntas >= 3) {
        requisitosAtendidos += 1;
    } if (quantidadeNiveis >= 2) {
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
        //    requisitosNaoAtendidos()
    // } 
    criarPerguntas()
}
function requisitosNaoAtendidos() {
    alert("Validação dos dados falhou. Tente novamente")
}

function criarPerguntas() {
    tela8.classList.add("hide")
    tela9.classList.remove("hide")

    tela9.innerHTML = `
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
        tela9.innerHTML += `
        <div class="container">
        <h2>Pergunta ${i + 1}</h2>
        </div>`
    }
    tela9.innerHTML += `<button onclick="validarPerguntas()">Prosseguir pra criar níveis</button>`
}

function validarPerguntas() {
    let perguntasDoQuizz = document.querySelectorAll(".tela-9 .container input");
    let textoDaPergunta = perguntasDoQuizz[0].value
    let corDeFundo = perguntasDoQuizz[1].value
    let respostaCorreta = perguntasDoQuizz[2].value
    let urlImagemCorreta = perguntasDoQuizz[3].value
    let respostaIncorreta1 = perguntasDoQuizz[4].value
    let urlImagemIncorreta1 = perguntasDoQuizz[5].value

    let requisitosAtendidos = 0;
    let linkSeguro = "";
    let linkSeguro2 = ""
    
    if (textoDaPergunta.length >= 20) {
        requisitosAtendidos += 1
    } if (corDeFundo.length == 7 && corDeFundo[0] == "#") {
        requisitosAtendidos += 1
    } if (respostaCorreta !== "" && respostaIncorreta1 !== "") {
        requisitosAtendidos += 1
    } if (urlImagemCorreta.length >= 5 && urlImagemIncorreta1.length >= 5) {
        for (let i = 0; i < 5; i++) {
            linkSeguro += urlImagemCorreta[i];
            linkSeguro2 += urlImagemIncorreta1[i];
            if (linkSeguro == "https" && linkSeguro2 == "https") {
                requisitosAtendidos += 1;
            }
        }
    }
    
    // if (requisitosAtendidos == 4) {
    //     decidirNiveisDoQuizz()
    // } else {
    //     requisitosAtendidos()
    // }
    decidirNiveisDoQuizz()
}
function decidirNiveisDoQuizz (){
    tela9.classList.add("hide")
    tela10.classList.remove("hide")

    tela10.innerHTML = `
    <h1>Agora, decida os níveis</h1>
    <div class="container">
        <h2>Nível 1</h2>
        <input type="text" placeholder="Título do nível">
        <input type="text" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <input type="text" placeholder="Descrição do nível">
    </div>`
    for (let i = 1; i < quantidadeNiveis; i++) {
        tela10.innerHTML += `
        <div class="container">
        <h2>Nível ${i + 1}</h2>
        </div>`
    }
    tela10.innerHTML += `<button onclick= "validarNiveis()">Finalizar Quizz</button>`    
}

function validarNiveis() {
    let niveisDoQuizz = document.querySelectorAll(".tela-10 .container input")
    let tituloNivel = niveisDoQuizz[0].value
    let porcentagemMinima = niveisDoQuizz[1].value
    let urlImagemNivel = niveisDoQuizz[2].value
    let descricaoNivel = niveisDoQuizz[3].value

    let requisitosAtendidos = 0;
    let linkSeguro = "";

    if (tituloNivel.length >= 10) {
        requisitosAtendidos += 1
    } if (porcentagemMinima >= 0 && porcentagemMinima <= 100 && porcentagemMinima !== "") {
        requisitosAtendidos += 1
    } if (urlImagemNivel.length >= 5) {
        for (let i = 0; i < 5; i++) {
            linkSeguro += urlImagemNivel[i]
            if (linkSeguro == "https") {
                requisitosAtendidos += 1
            }
        }
    } if (descricaoNivel.length >= 30) {
        requisitosAtendidos += 1
    }

    // if (requisitosAtendidos == 4) {
    //     finalizarQuizz()
    // } else (
    //     requisitosNaoAtendidos()
    // )

    finalizarQuizz()
}

function finalizarQuizz() {
    tela10.classList.add("hide")
    tela11.classList.remove("hide")
    tela11.innerHTML = `
    <h1>Seu quizz está pronto!</h1>
    <img src="${urlImagemQuizz}">
    <h3>${tituloQuizz}</h3>
    <button>Acessar Quizz</button>
    <button class="semBorda" onclick="voltarHome()">Voltar pra home</button>`
}
function voltarHome() {
    tela11.classList.add("hide")
    telaPrincipal.classList.remove("hide")
}






// FUNÇÃO PARA RENDERIZAR QUIZZ CLICADO NA TELA
function intoQuizz(id) {
    telaPrincipal.classList.add("hide");
    onQuizz.classList.remove("hide");
    IDQUIZZ = id;
    let promiseChoosenQuizz = axios.get(`${LINKGENERAL}/${IDQUIZZ}`);
    promiseChoosenQuizz.then(renderChoosenQuiz);
    // onQuizz.innerHTML += `

    // `;
}
function renderChoosenQuiz(quizz) {
    data = quizz.data;
    id = quizz.id;
    title = quizz.title;
    image = quizz.image;
    questions = quizz.questions;
    levels = quizz.levels;
    console.log(data);

    onQuizz.innerHTML = "";
    onQuizz.innerHTML += `
        <article class="choosen-quizz-on-screen">
            <img class="choosen-quizz-top-image" src="${data.image}" alt="">
            <h3>${data.title}</h3>
        </article>
        `;

    for (i = 0; i < data.questions.length; i++) {
        onQuizz.innerHTML += `
        <div class="question-container question-container-${i}">
        </div>
        `;
    }

    for (i = 0; i < data.questions.length; i++) {
        let questionContainer = document.querySelector(`.question-container-${i}`);
        questionContainer.innerHTML += `
            <div class="question question-${i}">
                <h4>${data.questions[i].title}</h4>
            </div>
            <div class="answers-container answers-container-${i}">

            </div>
        `;
        const questionBackgroundColor = data.questions[i].color; // api
        const questionBackground = document.querySelector(`.question-${i}`);
    
        questionBackground.style.backgroundColor = questionBackgroundColor;
        for (j = 0; j < data.questions[i].answers.length; j++) {
            let answersContainer = document.querySelector(`.answers-container-${i}`);
            // questionContainer.innerHTML += `
            answersContainer.innerHTML += `
            <div class="answer">
                <img class="choosen-quizz-answer-image" src="${data.questions[i].answers[j].image}" alt="">
                <h4>${data.questions[i].answers[j].text}</h4>
            </div>
            `;
        }
    }
    // const questionBackgroundColor = data.questions[i].color; // api
    // const questionBackground = document.querySelector(`.question-${i}`);

    // questionBackground.style.backgroundcolor = questionBackgroundColor;
    console.log(data.questions[0]);
}