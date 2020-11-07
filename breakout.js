const rulesBtn      = document.getElementById('rules-btn');
const closeRulesBtn = document.getElementById('close-rules-btn');
const rules         = document.getElementById('rules');
const canvas        = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
const brickRowCount     = 9;
const brickColumnCount  = 5;
const bricks = [];

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

/** Creat brick properties */
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible:true,   
}

/** Create bricks */
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo};
    }
}

/** Draw ball on canvas */
const drawBall = (ball)=> {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

/** Draw paddle on canvas */
const drawPaddle = (paddle)=> {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

/** Draw score on canvas */
const drawScore = ()=> {
    ctx.font = `20px Slackey`;
    ctx.fillText(`Score: ${score}`, canvas.width - 130, 30);
}

/** Draw brick */
const drawBricks = (brick)=> {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath(); 
        });
    });
}

/** Move paddle on canvas */
const movePaddle = ()=> {
    paddle.x += paddle.dx;

    //Wall detection
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0){
        paddle.x = 0;
    }
};

/** Move ball on canvas */
const moveBall = ()=> {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //Wall collision (x)
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1;
    }

    //Wall collision (y)
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }

    //Paddle collision
    if(ball.x - ball.size > paddle.x && ball.x + ball.size <
        paddle.x + paddle.w && ball.y + ball.size > paddle.y){
      ball.dy = -ball.speed;
    }

    //Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(
                 ball.x - ball.size > brick.x && //Left brick side check
                 ball.x + ball.size < brick.x + brick.w && //Right brick side check

                 ball.y + ball.size > brick.y && //Top brick side check
                 ball.y - ball.size < brick.y + brick.h //Bottom brick side check
                ){
                    ball.dy *= -1;
                    brick.visible = false;

                    increaseScore();
                }

            }
        });
    });

    //Hit bottom wall - lose
    if(ball.y + ball.size > canvas.height){
        showAllBrick();
        score = 0;
    }
}

/** Increase score */
const increaseScore = ()=> {
    score++;

    if(score % (brickRowCount * brickRowCount) === 0){
        showAllBricks();
    }
}

/** Make all bricks appear */
const showAllBrick = ()=> {
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    });
}
/** ----------------- Draw everything ---------------- */
const draw = ()=> {
    //Clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawBall(ball);
    drawPaddle(paddle);
    drawScore();
    drawBricks();
}

/** Update canvas drawing and animation */
const update = ()=> {
    movePaddle();
    moveBall();

    //Draw everything
    draw();

    requestAnimationFrame(update);
}

update();


/** Keydown event */
const keyDown = (e)=> {
    
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    }else if(e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = - paddle.speed;
    }
}

/** Keyup event */
const keyUp = (e)=> {
    if(
        e.key === 'Right'       || 
        e.key === 'ArrowRight'  ||
        e.key === 'Left'        || 
        e.key === 'ArrowLeft'
    ){
        paddle.dx = 0;
    }
}

/** Keyboard event handlers */
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

/** Rules and close event handlers */
rulesBtn.addEventListener('click', ()=> rules.classList.add('show'));
closeRulesBtn.addEventListener('click', ()=> rules.classList.remove('show'));