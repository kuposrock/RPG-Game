function game(){
var player ={
    name:"",
    items:[],
    hp:20,
    isAlive:true
};

function mainloop(){
    startGame();
    while(player.isAlive==true){

    }   
    resetPlayer();
}

function resetPlayer(){
    player.hp=20;
    player.items =[];
    player.isAlive =true;
}
function startGame(){
    player.name = readlineSync.question("Before we begin, WHat is your name: ");
    var intro = "Welcome `${player.name}` to the world of text adventure. You've awaken in a dark cave in the middle of the fore";
    console.log(intro);
}
}