const board = document.querySelector("#board");
const width = window.screen.width < 640 ? 20 : 40;
const height = 40;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
let direction = 'left';
let isGameOver = false;
let interval;
let random;
let score = 0;

function createBoard() {
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    for (let i = 0; i < width * height; i++) {
        const div = document.createElement("div");
        board.appendChild(div);
        divs.push(div);
    }

    color();
    setApple();
}

function color() {
    divs.forEach(div => {
        div.classList.remove("snake", "head");
    });

    snake.forEach((x, i) => {
        divs[x].classList.add("snake");

        if (i === 0) {
            divs[x].classList.add("head");
        }
    });
}

function move(dir) {
    if (isGameOver) {
        return;
    }

    let head = snake[0];

    if (dir === 'up') {
        if (direction === 'down') {
            return;
        }

        head -= width;

        if (head < 0) {
            gameOver();
            return;
        }
    } else if (dir === 'down') {
        if (direction === 'up') {
            return;
        }

        head += width;

        if (head >= width * height) {
            gameOver();
            return;
        }
    } else if (dir === 'left') {
        if (direction === 'right') {
            return;
        }

        head++;

        if (head % width === 0) {
            gameOver();
            return;
        }
    } else if (dir === 'right') {
        if (direction === 'left') {
            return;
        }

        if (head % width === 0) {
            gameOver();
            return;
        }

        head--;
    }

    if (snake.includes(head)) {
        gameOver();
        return;
    }

    direction = dir;
    snake.unshift(head);

    if (head === random) {
        score++;
        document.querySelector("#score span").innerText = score;
        sound("./Pebble.ogg");
        setApple();
    } else {
        snake.pop();
    }

    color();
    autoMove();
}

function autoMove() {
    clearInterval(interval);
    const speed = 300 - score;
    interval = setInterval(() => move(direction), speed > 50 ? speed : 50);
}

function gameOver() {
    isGameOver = true;
    clearInterval(interval);
    sound("./Country_Blues.ogg");
    document.querySelector("#newGame").style.display = "initial";
    setTimeout(() => alert("Game over"), 50);
}

function setApple() {
    do {
        random = Math.floor(Math.random() * width * height);
    } while (snake.includes(random))

    divs.forEach(d => d.classList.remove('apple'));
    divs[random].classList.add("apple");
}

function sound(fileName) {
    const audio = document.createElement('audio');
    audio.src = fileName;
    audio.play();
}

function newGame() {
    snake.splice(0, snake.length);
    snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
    isGameOver = false;
    score = 0;
    color();
    setApple();
    document.querySelector("#newGame").style.display = "none";
}

window.addEventListener("keydown", ev => {
    ev.preventDefault();

    switch (ev.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowRight": move("right"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
        case "Escape": clearInterval(interval); break;
        case "enter": newGame(); break
    }
});

document.getElementById("right").addEventListener("click", () => {
    move("right");
})
document.getElementById("left").addEventListener("click", () => {
    move("left");
})
document.getElementById("up").addEventListener("click", () => {
    move("up");
})
document.getElementById("down").addEventListener("click", () => {
    move("down");
})