let main = document.getElementById("main");
let allDivs = document.getElementsByTagName("div");

let imgArray = ['assets/1.gif', 'assets/2.gif', 'assets/3.gif', 'assets/4.gif', 'assets/5.gif', 'assets/6.gif','assets/1.gif', 'assets/2.gif', 'assets/3.gif', 'assets/4.gif', 'assets/5.gif', 'assets/6.gif'];

let rightAudio= new Audio('Assets/right.wav');
let wrongAudio= new Audio('Assets/wrong.wav');
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function imagesFunction() {
    let shuffledImages = shuffle([...imgArray]);

    for (let i = 0; i < shuffledImages.length; i++) {
        main.innerHTML += '<div><img src="' + shuffledImages[i] + '"></div>';
    }
}
imagesFunction();

let flg = true;
var arr = [];

for (let i = 0; i < allDivs.length; i++) {
    allDivs[i].addEventListener('click', function () {
        if (flg) {
            this.firstChild.style.opacity = '1';
            if (arr.length == 0) {
                arr[0] = this;
            } else if (arr.length == 1) {
                arr[1] = this;
            }
            if (arr.length == 2) {
                flg = false;
                setTimeout(checkImages,200);
                
            }
        }
    })
}

function checkImages() {
    if (arr[0].firstChild.getAttribute('src') == arr[1].firstChild.getAttribute('src')) {
        rightAudio.play();
        arr[0].classList.add("matched");
        arr[1].classList.add("matched");
    } else {
        arr[0].firstChild.style.opacity = 0;
        arr[1].firstChild.style.opacity = 0;
        wrongAudio.play();
    }
    arr=[];
    flg=true;

    let matchedDivs = document.querySelectorAll(".matched");
    if (matchedDivs.length === imgArray.length) {
            document.body.innerHTML += "<h1>Congratulations! You won the game 🎉</h1>";
            document.body.innerHTML += "<Button class ='btn' onclick='location.reload()'> Play Again </Button>";
    }
}
