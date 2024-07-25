var cor = "" ;
var ordem = [];
var cliks = 0;

let primeiroRound = true;

$(document).keydown(function(e) { 
    if (primeiroRound && e.key === "a") {
        primeiroRound = false;
        iniciarJogo();
    }
});



function iniciarJogo() {
    cor = "";
    gerarOrdem();
    $("h1").text("level " + ordem.length);
    for (let i = 0; i < ordem.length; i++) {
        setTimeout(function(){
            tocarTecla(ordem[i]);
            console.log(i);
        }, i * 500);
    }
    
    clickDoJogador();
}


function clickDoJogador(){
    $(".btn").off("click").click(function (e) { 
        if(e.target.id == ordem[cliks]){
            tocarTecla(e.target.id);
            cliks++;
            if(cliks == ordem.length){
                cliks = 0;
                setTimeout(function(){iniciarJogo()},1000);
            }else{
                clickDoJogador();
            }
        }else if(e.target.id != ordem[cliks]){
            $(".btn").off("click");
            return gameOver();
        }
    });
}

function gameOver(){
    $("body").addClass('game-over');
    let som = new Audio(src = `./sounds/wrong.mp3`);
    som.play();
    setTimeout(function(){$("body").removeClass("game-over");}, 100);
    $("h1").text("GAME-OVER PRESS ANY KEY TO RESTART");
    $(document).off("keydowm").keydown(function (e) { 
        cor = "" ;
        ordem = [];
        cliks = 0;
        $(document).off("keydown");
        iniciarJogo();
    });
    
}

function gerarOrdem(){
    var nCor = parseInt(Math.random()*4+1);
    switch (nCor) {
        case 1:
            cor = "green";
            break;
        case 2:
            cor = "red";
            break;
        case 3:
            cor = "yellow";
            break;
        case 4:
            cor = "blue";
            break;
    
        default:
            break;
    }
    ordem.push(cor);
    cor = "";
}


function tocarTecla(colorPressed){
    $(`#${colorPressed}`).addClass("pressed");
    setTimeout(function(){$(`#${colorPressed}`).removeClass("pressed");}, 100);
    tocarSom(colorPressed);
}

function tocarSom(colorPressed){
    let som = new Audio(src = `./sounds/${colorPressed}.mp3`);
    som.play();
}