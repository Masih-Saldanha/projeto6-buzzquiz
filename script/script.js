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
        <article>
        <img class="fundo" src="${data[i].image}" alt="">
        <h3>${data[i].title}</h3>
        </article>
        `
    }
    console.log(data);
}