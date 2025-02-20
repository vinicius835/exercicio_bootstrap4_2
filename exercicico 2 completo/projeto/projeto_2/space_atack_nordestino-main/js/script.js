// canvas
let tileSize = 32;
let rows = 16;
let collumn = 16;
let fashion;

let fashionwidth = tileSize * collumn;
let fashionheight = tileSize * rows;
let context;
//ship 
let shipWidth =  tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize *collumn/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight,
}
let lampiao;
let lampiaoVelocityX = tileSize;
// El aliens
let alienArray = [];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;
let alienRows = 2;
let alienCollumns = 3;
let alienCount = 0; //numero de mortes de aliens querendo apenas tomar água
let alienVelocityX = 1; // sua velocidade
// Munição
let bulletArray = [];
let bulletVelocityY = -10;
// recorde
let recorde = 0
let gameOver = false;
window.onload = function(){
    fashion = document.getElementById("fashion");
    fashion.width = fashionwidth;
    fashion.height = fashionheight;
    context = fashion.getContext("2d");
    // desenho do cabra macho
    alienImg  = new Image();
    alienImg.src ="./alien.png"
    createAliens();
    lampiao = new Image();
    lampiao.src = "./lampiao.png";
    lampiao.onload = function(){
        context.drawImage(lampiao,ship.x,ship.y,ship.width,ship.height);
    }

    requestAnimationFrame(update);
    document.addEventListener("keydown",movelampiao)
    document.addEventListener("keyup",atirar)
}
function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0,0,fashion.width,fashion.height);
    context.drawImage(lampiao,ship.x,ship.y,ship.width,ship.height);
    //aliens
    for (let i =0;i<alienArray.length;i++){
        let alien = alienArray[i];
        if (alien.alive){
            alien.x  += alienVelocityX;
            
            if(alien.x + alien.width >= fashion.width|| alien.x<=0){
                alienVelocityX *= -1;
                alien.x += alienVelocityX*2;
                for (let j = 0; j< alienArray.length;j++){
                    alienArray[j].y += alienHeight
                }
                
            }
            context.drawImage(alienImg,alien.x,alien.y,alien.width,alien.height);
            if(alien.y >= ship.y){
                gameOver=true;
        
            }
        }
    }
    // munição
    for (let i = 0; i<bulletArray.length;i++){
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillstyle = "black"
        context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height)
        //colisão
        for (let j = 0; j<alienArray.length;j++){
            let alien = alienArray[j];
            if(!bullet.used &&alien.alive && detectar_colisão(bullet,alien)){
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                recorde +=100;
            }
        }
    }
    //tirar a munição que está no além
    while (bulletArray.length > 0 && (bulletArray[0].used|| bulletArray[0].y < 0 )){
        bulletArray.shift(); //removes the first element of the array
    }
    //proxima fase
    if (alienCount == 0){
        alienCollumns = Math.min(alienCollumns +1,collumn/2-2);
        alienRows = Math.min(alienRows+1,rows-4);
        alienVelocityX +=0.2;
        alienArray = [];
        bulletArray = [];
        createAliens();
    }
    //recorde
    context.fillstyle = "white";
    context.font = "16px courier"
    context.fillText(recorde,5,20);
}
function movelampiao(e){
    if(gameOver){
        return;
    }
    if (e.code == "ArrowLeft" && ship.x - lampiaoVelocityX >=0 || e.code =="KeyA" && ship.x - lampiaoVelocityX >=0){
        ship.x -= lampiaoVelocityX;
    }
    else if(e.code == "ArrowRight" && ship.x + lampiaoVelocityX+shipWidth <=fashion.width || e.code == "KeyD" && ship.x + lampiaoVelocityX+shipWidth <=fashion.width ){
        ship.x += lampiaoVelocityX;
    }
}
function createAliens(){
    for (let c=0;c<alienCollumns;c++){
        for (let r= 0; r<alienRows;r++){
            let alien = {
                img: alienImg,
                x: alienX + c*alienWidth,
                y: alienY + r*alienHeight,
                width: alienWidth,
                height:alienHeight,
                alive : true
            }
            alienArray.push(alien);

        }
    }
    alienCount = alienArray.length;
}
function atirar(e){
    if(gameOver){
        return;
    }
    if(e.code == "Space" || e.code == "KeyW"){
        let bullet = {
            x : ship.x + shipWidth*15/32,
            y : ship.y,
            width: tileSize/8,
            height: tileSize/2,
            used : false,
        }
        bulletArray.push(bullet);
    }
}
function detectar_colisão(a,e){
    return a.x < e.x  + e.width &&
            a.x + a.width> e.x &&
            a.y < e.y  + e.height &&
            a.y + a.height> e.y;
}

















//     context.strokeStyle = "#192919"
//     for (let i = 32; i< fashion.width; i += 32) {
//         context.beginPath()
//         context.lineTo(i,0)
//         context.lineTo(i,600)
//         context.stroke() 
        
//         context.beginPath()
//         context.lineTo(0,i)
//         context.lineTo(600,i)
//         context.stroke() 
        
        
//     }
// }
