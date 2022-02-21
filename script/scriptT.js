const LINKGENERAL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let IDQUIZZ = "";
let promise = axios.get(LINKGENERAL);
let loading = document.querySelector(".loading");
promise.then(renderQuizzes);
function renderQuizzes(quizz) {
    data = quizz.data;
    title = data.title;
    image = data.image;
    id = data.id;

    loading.classList.remove("hide");
    telaPrincipal.classList.remove("hide");
    onQuizz.classList.add("hide");

    const quizzListHTML = document.querySelector("section");
    quizzListHTML.innerHTML = ``;
    for (i = 0; i < data.length; i++) {
        quizzListHTML.innerHTML += `
        <article onclick = "intoQuizz(${data[i].id})" class="quizz-on-screen">
            <img class="fundo" src="${data[i].image}" alt="">
            <h3>${data[i].title}</h3>
        </article>
        `;
        if (i === (data.length - 1)) {
            loading.classList.add("hide");
        }
    }
    telaPrincipal.scrollIntoView(true);
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

let conteudoQuizzCriado = {
    title: "",
    image: "",
    questions: [],
    levels: []
}
let dadosSerializadosQuizzCriado = JSON.stringify(conteudoQuizzCriado);

let listaSerializada = undefined;
let quizzCriado = undefined;
let idQuizzAtual = undefined;

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
        conteudoQuizzCriado.title = tituloQuizz
    } if (quantidadeDePerguntas >= 3) {
        requisitosAtendidos += 1;
        conteudoQuizzCriado.questions.length = quantidadeDePerguntas

        for (i = 0; i < quantidadeDePerguntas; i++) {
            conteudoQuizzCriado.questions[i] = { title: "", color: "", answers: [] }
        }

    } if (quantidadeNiveis >= 2) {
        requisitosAtendidos += 1;
        conteudoQuizzCriado.levels.length = quantidadeNiveis

        for (i = 0; i < quantidadeNiveis; i++) {
            conteudoQuizzCriado.levels[i] = { title: "", image: "", text: "", minValue: 0 }
            // quando eu to validando o title do elemento 0 do array levels >
            // conteudoQuizzCriado.levels[0]. = ""
        }

    } if (urlImagemQuizz.length >= 5) {
        for (let i = 0; i < 5; i++) {
            linkSeguro += urlImagemQuizz[i];
            if (linkSeguro == "https") {
                requisitosAtendidos += 1;
                conteudoQuizzCriado.image = urlImagemQuizz
            }
        }
    }

    if (requisitosAtendidos == 4) {
        criarPerguntas()
    } else {
        requisitosNaoAtendidos()
    }
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
        <input type="text" placeholder="Texto da pergunta" class="textoDaPergunta">
        <input type="text" placeholder="Cor de fundo da pergunta" class="corDeFundo">
        <h2>Resposta correta</h2>
        <div class="respostaCorreta">
            <div class="resposta">
                <input type="text" placeholder="Resposta correta" class="respostaVerdadeira">
                <input type="text" placeholder="URL da imagem" class="urlImagemCorreta">
            </div>
        </div>
        <h2>Respostas incorretas</h2>
        <div class="respostasIncorretas">
            <div class="resposta">
                <input type="text" placeholder="Resposta incorreta 1" class="respostaIncorreta">
                <input type="text" placeholder="URL da imagem 1" class="urlImagemIncorreta">
            </div>
            <div class="resposta">
                <input type="text" placeholder="Resposta incorreta 2" class="respostaIncorreta">
                <input type="text" placeholder="URL da imagem 2" class="urlImagemIncorreta">
            </div>
            <div class="resposta">
                <input type="text" placeholder="Resposta incorreta 3" class="respostaIncorreta">
                <input type="text" placeholder="URL da imagem 3" class="urlImagemIncorreta">
            </div>
        </div>
    </div>`
    for (let i = 1; i < quantidadeDePerguntas; i++) {
        tela9.innerHTML += `
        <div class="container">
        <h2>Pergunta ${i + 1}</h2>
        <ion-icon name="create-outline" onclick="abirPergunta(this)"></ion-icon>
        </div>`
    }
    tela9.innerHTML += `<button onclick="validarPerguntas()">Prosseguir pra criar níveis</button>`
}
function abirPergunta(botao) {
    botao.classList.add("hide")
    let pergunta = botao.parentNode
    pergunta.innerHTML += `
    <input type="text" placeholder="Texto da pergunta" class="textoDaPergunta">
    <input type="text" placeholder="Cor de fundo da pergunta" class="corDeFundo">
    <h2>Resposta correta</h2>
    <div class="respostaCorreta">
        <div class="resposta">
            <input type="text" placeholder="Resposta correta" class="respostaVerdadeira">
            <input type="text" placeholder="URL da imagem" class="urlImagemCorreta">
        </div>
    </div>
    <h2>Respostas incorretas</h2>
    <div class="respostasIncorretas">
        <div class="resposta">
            <input type="text" placeholder="Resposta incorreta 1" class="respostaIncorreta">
            <input type="text" placeholder="URL da imagem 1" class="urlImagemIncorreta">
        </div>
        <div class="resposta">
            <input type="text" placeholder="Resposta incorreta 2" class="respostaIncorreta">
            <input type="text" placeholder="URL da imagem 2" class="urlImagemIncorreta">
        </div>
        <div class="resposta">
            <input type="text" placeholder="Resposta incorreta 3" class="respostaIncorreta">
            <input type="text" placeholder="URL da imagem 3" class="urlImagemIncorreta">
        </div>
    </div>`
}
function validarPerguntas() {
    let textoDaPergunta = document.querySelectorAll(".tela-9 .container .textoDaPergunta")
    let corDeFundo = document.querySelectorAll(".tela-9 .container .corDeFundo")
    let respostaVerdadeira = document.querySelectorAll(".tela-9 .container .respostaVerdadeira")
    let urlImagemCorreta = document.querySelectorAll(".tela-9 .container .urlImagemCorreta")
    let respostaIncorreta = document.querySelectorAll(".tela-9 .container .respostaIncorreta")
    let urlImagemIncorreta = document.querySelectorAll(".tela-9 .container .urlImagemIncorreta")

    let caracteresValidos = ["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let requisitosAtendidos = 0;

    let somaTexto = 0
    let somaCor = 0
    let somaCorreta = 0
    let somaIncorreta = 0
    let somaUrlCorreta = 0
    let somarUrlncorreta = 0

    for (let i = 0; i < textoDaPergunta.length; i++) {
        let valor = textoDaPergunta[i].value
        if (valor.length >= 20) {
            somaTexto += 1
        } if (somaTexto / textoDaPergunta.length == 1) {
            requisitosAtendidos += 1
            console.log("titulo da pergunta atingida")
            console.log(requisitosAtendidos)

            for (i = 0; i < quantidadeDePerguntas; i++) {
                conteudoQuizzCriado.questions[i].title = textoDaPergunta[i].value;
            }
        }
    }

    for (let i = 0; i < corDeFundo.length; i++) {
        // console.log("entrei")
        let valor = corDeFundo[i].value
        if (valor.length === 7 && valor[0] === "#") {
            // console.log("entrei2")
            for (let j = 0; j < valor.length; j++) {
                for (let k = 0; k < caracteresValidos.length; k++) {
                    // console.log(`somaCor = ${somaCor}`)

                    if (valor[j] == caracteresValidos[k]) {
                        somaCor += 1

                        if (somaCor % 6 === 0) {
                        }
                    }

                }
            }

        } if (somaCor / (corDeFundo.length * 6) == 1) {
            requisitosAtendidos += 1
            console.log("cor da pergunta atingida")
            console.log(requisitosAtendidos)

            for (i = 0; i < quantidadeDePerguntas; i++) {
                conteudoQuizzCriado.questions[i].color = corDeFundo[i].value;
            }
        }
    }

    for (i = 0; i < quantidadeDePerguntas; i++) {
        for (j = 0; j < 4; j++) {
            conteudoQuizzCriado.questions[i].answers[j] = { text: "", image: "", isCorrectAnswer: undefined }
        }
    }


    for (let i = 0; i < respostaVerdadeira.length; i++) {
        let valor = respostaVerdadeira[i].value
        if (valor !== "") {
            somaCorreta += 1
        } if (somaCorreta / (respostaVerdadeira.length) == 1) {
            requisitosAtendidos += 1
            console.log("booleano e text das resposta certas atingida")
            console.log(requisitosAtendidos)

            for (i = 0; i < respostaVerdadeira.length; i++) {
                conteudoQuizzCriado.questions[i].answers[0].text = respostaVerdadeira[i].value;
                conteudoQuizzCriado.questions[i].answers[0].isCorrectAnswer = true;
            }

        }
    }
    for (let i = 0; i < respostaIncorreta.length; i++) {
        let valor = respostaIncorreta[i].value
        if (valor !== "") {
            somaIncorreta += 1
        } if (somaIncorreta / respostaIncorreta.length == 1) {
            requisitosAtendidos += 1
            console.log("booleano e text das resposta erradas atingida")
            console.log(requisitosAtendidos)

            for (i = 0; i < quantidadeDePerguntas; i++) {
                for (j = 1; j < 4; j++) {
                    conteudoQuizzCriado.questions[i].answers[j].text = respostaIncorreta[(j - 1) + (i * 3)].value;
                    conteudoQuizzCriado.questions[i].answers[j].isCorrectAnswer = false;
                }
            }

        }
    }
    for (let i = 0; i < urlImagemCorreta.length; i++) {
        let valor = urlImagemCorreta[i].value
        let linkSeguro = ""
        if (valor.length >= 5) {
            for (let j = 0; j < 5; j++) {
                linkSeguro += valor[j]
            } if (linkSeguro == "https") {
                somaUrlCorreta += 1
            }
        } if (somaUrlCorreta / urlImagemCorreta.length == 1) {
            requisitosAtendidos += 1
            console.log("image das resposta certas atingida")
            console.log(requisitosAtendidos)

            for (i = 0; i < urlImagemCorreta.length; i++) {
                conteudoQuizzCriado.questions[i].answers[0].image = urlImagemCorreta[i].value;
            }

        }
    }
    for (let i = 0; i < urlImagemIncorreta.length; i++) {
        let valor = urlImagemIncorreta[i].value
        let linkSeguro = ""
        if (valor.length >= 5) {
            for (let j = 0; j < 5; j++) {
                linkSeguro += valor[j]
            } if (linkSeguro == "https") {
                somarUrlncorreta += 1
            }
        } if (somarUrlncorreta / urlImagemIncorreta.length == 1) {
            requisitosAtendidos += 1
            console.log("image das resposta erradas atingida")
            console.log(requisitosAtendidos)

            for (i = 0; i < quantidadeDePerguntas; i++) {
                for (j = 1; j < 4; j++) {
                    conteudoQuizzCriado.questions[i].answers[j].image = urlImagemIncorreta[(j - 1) + (i * 3)].value;
                }
            }

        }
    }

    if (requisitosAtendidos == 6) {
        decidirNiveisDoQuizz()
    } else {
        // console.log(requisitosAtendidos)
        requisitosNaoAtendidos()
    }
}

function decidirNiveisDoQuizz() {
    tela9.classList.add("hide")
    tela10.classList.remove("hide")

    tela10.innerHTML = `
    <h1>Agora, decida os níveis</h1>
    <div class="container">
        <h2>Nível 1</h2>
        <input type="text" placeholder="Título do nível" class="tituloNivel">
        <input type="text" placeholder="% de acerto mínima" class="porcentagemNivel">
        <input type="text" placeholder="URL da imagem do nível" class="urlImagem">
        <input type="text" placeholder="Descrição do nível" class="descricaoNivel">
    </div>`
    for (let i = 1; i < quantidadeNiveis; i++) {
        tela10.innerHTML += `
        <div class="container">
        <h2>Nível ${i + 1}</h2>
        <ion-icon name="create-outline" onclick="abirNivel(this)"></ion-icon>
        </div>`
    }
    tela10.innerHTML += `<button onclick= "validarNiveis()">Finalizar Quizz</button>`
}
function abirNivel(botao) {
    botao.classList.add("hide")
    let nivel = botao.parentNode

    nivel.innerHTML += `
    <input type="text" placeholder="Título do nível" class="tituloNivel">
    <input type="text" placeholder="% de acerto mínima" class="porcentagemNivel">
    <input type="text" placeholder="URL da imagem do nível" class="urlImagem">
    <input type="text" placeholder="Descrição do nível" class="descricaoNivel">`
}
function validarNiveis() {
    let titulo = document.querySelectorAll(".tela-10 .container .tituloNivel")
    let porcentagens = document.querySelectorAll(".tela-10 .container .porcentagemNivel")
    let urlImagem = document.querySelectorAll(".tela-10 .container .urlImagem")
    let descricao = document.querySelectorAll(".tela-10 .container .descricaoNivel")

    let requisitosAtendidos = 0;
    let somaDescricao = 0
    let somaTitulo = 0
    let linkSeguro = "";
    let https = ""
    let soma1 = 0
    let soma2 = 0
    for (let i = 0; i < quantidadeNiveis; i++) {
        https += "https"
    }
    for (let i = 0; i < titulo.length; i++) {
        let valor = titulo[i].value
        if (valor.length >= 10) {
            somaTitulo += 1
        } if (somaTitulo / titulo.length == 1) {
            requisitosAtendidos += 1
            console.log("titulo atingida")
            console.log(requisitosAtendidos)

            for (i = 0; i < titulo.length; i++) {
                conteudoQuizzCriado.levels[i].title = titulo[i].value;
            }
        }
    }
    for (let i = 0; i < porcentagens.length; i++) {
        let valor = porcentagens[i].value
        if (valor >= 0 && valor <= 100 && valor !== "") {
            soma1 += 1
        } if (valor == 0) {
            soma2 += 1
        } if (soma1 / porcentagens.length == 1 && soma2 >= 1) {
            requisitosAtendidos += 1
            console.log("porcentagem minima atingida")
            console.log(requisitosAtendidos)
            for (i = 0; i < porcentagens.length; i++) {
                conteudoQuizzCriado.levels[i].minValue = parseInt(porcentagens[i].value);
            }
        }
    }
    for (let i = 0; i < urlImagem.length; i++) {
        let soma = 0
        let valor = urlImagem[i].value
        if (valor.length >= 5) {
            for (let j = 0; j < 5; j++) {
                linkSeguro += valor[j]
                if (linkSeguro == https) {
                    soma += 1
                }
            }
        } if (soma == 1) {
            requisitosAtendidos += 1
            console.log("image atingida")
            console.log(requisitosAtendidos)
            for (i = 0; i < urlImagem.length; i++) {
                conteudoQuizzCriado.levels[i].image = urlImagem[i].value;
            }
        }
    }
    for (let i = 0; i < descricao.length; i++) {
        let valor = descricao[i].value
        if (valor.length >= 30) {
            somaDescricao += 1
        } if (somaDescricao / descricao.length == 1) {
            requisitosAtendidos += 1
            console.log("text atingida")
            console.log(requisitosAtendidos)
            for (i = 0; i < descricao.length; i++) {
                conteudoQuizzCriado.levels[i].text = descricao[i].value;
            }
        }
    }

    if (requisitosAtendidos == 4) {
        let sendQuizzToAPI = axios.post(`${LINKGENERAL}`, conteudoQuizzCriado);
        sendQuizzToAPI.then(sendQuizz);
        finalizarQuizz()
    } else {
        console.log(`requisitos atendidos: ${requisitosAtendidos}`)
        requisitosNaoAtendidos()
    }
}
function finalizarQuizz() {
    tela10.classList.add("hide")
    tela11.classList.remove("hide")

    // tela11.innerHTML = `
    // <h1>Seu quizz está pronto!</h1>
    // <div class="image-container">
    //     <img src="${urlImagemQuizz}">
    // </div
    // <h3>${tituloQuizz}</h3>
    // <button onclick="intoQuizz(${idQuizzAtual})">Acessar Quizz</button>
    // <button class="semBorda" onclick="returnHome()">Voltar pra home</button>`
    console.log(conteudoQuizzCriado)
}
function sendQuizz(objeto) {
    let data = objeto.data
    dadosSerializadosQuizzCriado = JSON.stringify(data);
    localStorage.setItem(`${data.id}`, dadosSerializadosQuizzCriado);

    dadosDeserializadosQuizzCriado = localStorage.getItem(`${data.id}`);
    quizzCriado = JSON.parse(dadosDeserializadosQuizzCriado);

    idQuizzAtual = data.id;
    IDQUIZZ = idQuizzAtual

    console.log(data)

    tela11.innerHTML = `
    <h1>Seu quizz está pronto!</h1>
    <div class="image-container">
        <img src="${urlImagemQuizz}">
    </div
    <h3>${tituloQuizz}</h3>
    <button onclick="intoQuizz(${idQuizzAtual})">Acessar Quizz</button>
    <button class="semBorda" onclick="returnHome()">Voltar pra home</button>`
}

// FUNÇÃO PARA RENDERIZAR QUIZZ CLICADO NA TELA
function intoQuizz(id) {
    loading.classList.remove("hide");
    tela11.classList.add("hide");
    telaPrincipal.classList.add("hide");
    onQuizz.classList.remove("hide");
    IDQUIZZ = id;
    let promiseChoosenQuizz = axios.get(`${LINKGENERAL}/${IDQUIZZ}`);
    promiseChoosenQuizz.then(renderChoosenQuiz);
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

        let shuffledAnswers = data.questions[i].answers;
        shuffledAnswers.sort(comparator);

        for (j = 0; j < data.questions[i].answers.length; j++) {
            let answersContainer = document.querySelector(`.answers-container-${i}`);
            answersContainer.innerHTML += `
            <div class="answer answer-${shuffledAnswers[j].isCorrectAnswer}" onclick="chooseAnswer(${shuffledAnswers[j].isCorrectAnswer}, ${i})">
                <img class="choosen-quizz-answer-image" src="${shuffledAnswers[j].image}" alt="">
                <h4>${shuffledAnswers[j].text}</h4>
            </div>`;
        }
    }
    loading.classList.add("hide");
}

// FUNÇÃO DE ESCOLHER RESPOSTA
let score = 0;
let answeredQuestions = 0;
let finalScore = 0;
function chooseAnswer(answer, answerBoxID) {
    let answerBox = document.querySelector(`.answers-container-${answerBoxID}`)
    let totalPoints = document.querySelectorAll(".question-container").length;
    // answerBox.style.backgroundColor = ("#333333");
    answerBox.classList.add("choosen-answer");
    for (i = 0; i < answerBox.childElementCount; i++) {
        if (answerBox.children[i].classList.value === 'answer answer-true') {
            answerBox.children[i].children[1].style.color = ("#009C22");
            answerBox.children[i].setAttribute("onclick", "");
        } else {
            answerBox.children[i].children[1].style.color = ("#FF0B0B");
            answerBox.children[i].setAttribute("onclick", "");
        }
    }
    if (answer === true) {
        score += 1;
        answeredQuestions += 1;
    } else {
        answeredQuestions += 1;
    }
    if (answerBoxID < (totalPoints - 1)) {
        let nextQuestion = document.querySelector(`.question-container-${answerBoxID + 1}`);
        setTimeout(() => {
            nextQuestion.scrollIntoView(false);
        }, 2000);
    }
    if (answeredQuestions === totalPoints) {
        finalScore = (score / totalPoints) * 100;
        finalScore = Math.round(finalScore);
        console.log(finalScore);
        for (i = 1; i < data.levels.length; i++) {
            if (finalScore >= data.levels[i - 1].minValue && finalScore <= data.levels[i].minValue) {
                onQuizz.innerHTML += `
                    <div class="quizz-end">
                    <h4>${finalScore}% de acerto: ${data.levels[i].title}</h4>
                    </div>
                    <img class="end-img" src="${data.levels[i].image}" alt="">
                    <h4 class="end-text">${data.levels[i].text}</h4>
                    <button onclick="restartQuizz()">Reiniciar Quizz</button>
                    <button class="return-home" onclick="returnHome()">Voltar pra home</button>
                    `;
            } else {
                onQuizz.innerHTML += `
                    <div class="quizz-end">
                    <h4>${finalScore}% de acerto: ${data.levels[i].title}</h4>
                    </div>
                    <img class="end-img" src="${data.levels[i].image}" alt="">
                    <h4 class="end-text">${data.levels[i].text}</h4>
                    <button onclick="restartQuizz()">Reiniciar Quizz</button>
                    <button class="return-home" onclick="returnHome()">Voltar pra home</button>
                    `;
            }
            setTimeout(() => {
                onQuizz.scrollIntoView(false);
            }, 2000);
        }
        score = 0;
        answeredQuestions = 0;
        finalScore = 0;
    }
}

// FUNÇÃO PARA VOLTAR PARA HOME
function returnHome() {
    tela11.classList.add("hide");
    telaPrincipal.scrollIntoView(true);
    promise = axios.get(LINKGENERAL);
    promise.then(renderQuizzes);
}

// FUNÇÃO PARA REINICIAR O QUIZZ
function restartQuizz() {
    onQuizz.scrollIntoView(true);
    intoQuizz(IDQUIZZ);
}

// FUNÇÃO DE EMBARALHAR
function comparator() {
    return Math.random() - 0.5;
}