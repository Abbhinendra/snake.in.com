let inputDir = { x: 0, y: 0 };

let speed = 6;
let lastPainTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let score = 0;
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPainTime) / 1000 < 1 / speed) {
        return;
    }
    lastPainTime = ctime;

    gameEngine();
}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }


}
function gameEngine() {

    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("game over");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }


    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if (score > heighVal) {
            heighVal = score;
            localStorage.setItem('hiscore', JSON.stringify(heighVal));
            height.innerHTML = "Hiscore :" + heighVal;
        }
        scrore.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }



    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }


    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeEelement = document.createElement('div');
        snakeEelement.style.gridRowStart = e.y;
        snakeEelement.style.gridColumnStart = e.x;

        if (index === 0) {

            snakeEelement.classList.add('head');

        }
        else {
            snakeEelement.classList.add('snake');
        }
        board.appendChild(snakeEelement);
    })
    foodEelement = document.createElement('div');
    foodEelement.style.gridRowStart = food.y;
    foodEelement.style.gridColumnStart = food.x;
    foodEelement.classList.add('food');
    board.appendChild(foodEelement);


}

let heigh = localStorage.getItem('hiscore');
if (heigh === null) {
    let heighVal = 0;
    localStorage.setItem('hiscore', JSON.stringify(heighVal))
}
else {
    heighVal = JSON.parse(heigh);
    height.innerHTML = "Hiscore :" + heigh;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 }

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});
