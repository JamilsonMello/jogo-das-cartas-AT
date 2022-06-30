function criarElementoHTML(tag, parentesco) {
    let elemHTML = document.createElement(tag);  
    parentesco.appendChild(elemHTML);
    return elemHTML;
}

function criarImg(src, parentesco) {
    let img = criarElementoHTML("img", parentesco);
    img.src = src;
    return img;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

function initialScreen(imagens, parent) {
    imagens.pop();
    imagens.forEach((pathImg) => {
        let button = criarElementoHTML("button", parent);
        criarImg(pathImg, button);
        button.classList.add('animation');
    })

    let divButtons = criarElementoHTML("div", document.querySelector("#tabuleiro"));
    let startButton = criarElementoHTML("button",divButtons);
    let restartButton = criarElementoHTML("button", divButtons);
    startButton.id = "startButton";
    startButton.innerHTML = "START";
    restartButton.id = "restartButton";
    restartButton.innerHTML = "RESTART";
}

function startGame(imagens, div) {
    let initialDate = new Date().getTime();
    div.innerHTML = '';
    let imageClicked = [];
    let rightAnswers = 0;
    let canPlay = false;

    shuffleArray(imagens).forEach((pathImg, index) => {
        let button = criarElementoHTML("button", div);
        let image = criarImg(pathImg, button);
        button.id = `${pathImg}#${index.toString()}`;
        image.id = `image#${pathImg}#${index.toString()}`;
        button.classList.add('animation');
        button.addEventListener("click", () => {
            let [orginalImage, indexTable] = button.id.toString().split('#');
            imageClicked.push({
                image: orginalImage,
                imageId: image.id,
                indexTable: indexTable,
                buttonId: button.id
            });
    
            if (!canPlay) return;
            if (imageClicked.length === 2 && imageClicked[0].buttonId === imageClicked[1].buttonId) {
                imageClicked.pop();
                return;
            };
            document.getElementById(button.id).style.transform = 'rotateY(180deg)';
            document.getElementById(image.id).style.transform = 'rotateY(180deg)';
            image.src = orginalImage;
            if (imageClicked.length === 2 && imageClicked[0].image !== imageClicked[1].image && imageClicked[0].indexTable !== imageClicked[1].indexTable) {
                canPlay = !canPlay;
                setTimeout(() => {
                    document.getElementById(imageClicked[0].imageId).src = 'img/cross.png';
                    document.getElementById(imageClicked[1].imageId).src = 'img/cross.png';
                    document.getElementById(imageClicked[0].buttonId).style.transform = 'rotateY(0deg)';
                    document.getElementById(imageClicked[1].buttonId).style.transform = 'rotateY(0deg)';
                    imageClicked = [];
                    canPlay = !canPlay;
                }, 1500);
                return;
            }
    
            if (imageClicked.length === 2 && imageClicked[0].indexTable !== imageClicked[1].indexTable) {
                imageClicked = [];
                rightAnswers++;
    
                if (rightAnswers === 8) {
                    canPlay = !canPlay;
                    let bestTimePlayed = Number(localStorage.getItem('the-best-time') || 0);
                    let timePlayed = Number((new Date().getTime() - initialDate) / 1000);
                    
                    if (bestTimePlayed === 0) {
                        localStorage.setItem('the-best-time', JSON.parse(timePlayed))
                    } else if (timePlayed < bestTimePlayed) {
                        localStorage.setItem('the-best-time', JSON.parse(timePlayed))
                    }
                    
                    alert('seu tempo ' +  Number(localStorage.getItem('the-best-time') || 0) + ' segundos');
                }
                return;
            } 
        })
    })
    setTimeout(() => {
        document.querySelectorAll("img").forEach(element => {
            element.src = 'img/cross.png'
        })
        canPlay = !canPlay;
    }, 3000)
}

function onButtonClick() {
    alert(`Melhor tempo: ${Number(localStorage.getItem('the-best-time') || 0)} segundos`);
}

(function () {
var imagens = ['img/facebook.png','img/facebook.png','img/android.png','img/android.png','img/chrome.png','img/chrome.png','img/firefox.png','img/firefox.png','img/html5.png','img/html5.png','img/googleplus.png','img/googleplus.png','img/twitter.png','img/twitter.png','img/windows.png','img/windows.png','img/cross.png'];
let container = document.querySelector("#tabuleiro");
let div = criarElementoHTML("div", container);
div.id = 'listing-carts';
initialScreen(imagens, div);
let startButton = document.querySelector("#startButton");
let restartButton = document.querySelector("#restartButton");
let bestTimeButton = document.querySelector(".best-time-btn");
restartButton.addEventListener("click", () => location.reload());
startButton.addEventListener("click", () => startGame(imagens, div));
bestTimeButton.addEventListener("click", onButtonClick);
})();