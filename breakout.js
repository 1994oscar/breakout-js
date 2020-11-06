const rulesBtn      = document.getElementById('rules-btn');
const closeRulesBtn = document.getElementById('close-rules-btn');
const rules         = document.getElementById('rules');
const canvas        = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
let score = 0;

/** Create ball properties */
const ball = {
    //Position
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    //Animation
    speed: 4,
    dx: 4,
    dy: -4,
};

/** Create paddle properties */
const paddle = {
    //Position
    x: canvas.width / 2 - 40,
    y: canvas.height -20,
    w: 80,
    h: 10,
    //Animation
    speed: 8,
    dx: 0,
}

/** Draw ball on canvas */
const createBall = (ball)=>{
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

/** Draw paddle on canvas */
const createPaddle = (paddle)=>{
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

/** Draw everything */
const draw = () => {
    createBall(ball);
    createPaddle(paddle);
    drawScore();
}

/** Draw score on canvas */
const drawScore = ()=>{
    ctx.font = `20px Slackey`;
    ctx.fillText(`Score: ${score}`, canvas.width - 130, 30);
}

draw();

/** Rules and close event handlers */
rulesBtn.addEventListener('click', ()=> rules.classList.add('show'));
closeRulesBtn.addEventListener('click', ()=> rules.classList.remove('show'));