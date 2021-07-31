const readlineSync = require('readline-sync');
var player = {
    name: "",
    items: [],
    hp: 20,
    isAlive: true
};
function enemy(name, hp, item) {
    this.name = name;
    this.hp = hp;
    this.item = item;
}
var enemies = [new enemy("Flarg", 3, "HP 1 Potion"), new enemy("Melv", 2, "HP 2 Potion"), new enemy("Rock", 3, "HP 3 Potion"), new enemy("Boss Monster", 5, "HP 5 Potion")];
var villageDistance = 10;
var playAgain = true;
var fightChance = 25;
var responseMenu = "What would you like to do:\n W / Walk- Walk towards the village.\n P / Print- See player details.\n"

while (playAgain) {
    mainLoop();
    switch (readlineSync.question("Would you like to play again?")) {
        case 'y':
            playAgain = true;
            resetPlayer();
            break;
        case 'yes':
            playAgain = true;
            resetPlayer();
            break;
        default:
            playAgain = false;
            break;
    }

}

function mainLoop() {
    startGame();
    while (player.isAlive) {
        console.log('\n'.repeat('2'));
        switch (readlineSync.question(responseMenu)) {
            case 'w':
                walkTowardsVillage();
                break;
            case 'walk':
                walkTowardsVillage();
                break;
            case 'q':
                player.isAlive = false;
                playagain = false;
                break;
            case 'quit':
                player.isAlive = false;
                playagain = false;
                break;
            case 'p':
                printItems();
                break;
            case 'print':
                printItems();
                break;
        }
        if (villageDistance <= 0) {
            player.isAlive = false;
            console.log('\n'.repeat('1'));
            console.log("Congratulations " + player.name + " You've made it back home.\n");
        }
    }

}

function walkTowardsVillage() {
    villageDistance--;
    console.log("You are " + villageDistance + " miles from the village.");
    if (fightChance < getRandomInt(100)) {
        fight();
    }
}

function fight() {
    var enemyToFight = enemies[getRandomInt(enemies.length)];
    var hpLeft = enemyToFight.hp;
    var inFight = true;
    var damage = 0;
    var playerDamage = 0;

    console.log('\n'.repeat('1'));
    console.log("You got into a fight with " + enemyToFight.name + " while on your way home.");

    while (inFight) {
        console.log('\n');
        console.log("You have " + player.hp + " hp.");
        console.log(enemyToFight.name + " has " + hpLeft + " HP.");
        switch (readlineSync.question("What do you want to do.\n1.Attack\n2.Run\n")) {
            case '1':
                playerDamage = getRandomInt(hpLeft) + 1;
                hpLeft -= playerDamage;
                console.log("You attacked and hit a: " + playerDamage + ".");
                break;
            case '2':
                if (getRandomInt(100) > 50) {
                    inFight = false;
                    console.log(`You've managed to escape but ${enemyToFight.name} hit you before you escaped.`);
                }
                else {
                    console.log(`You tried to escape but ${enemyToFight.name} was able to grab you.`);
                }
                break;
        }
        if (hpLeft <= 0) {
            console.log("You've killed " + enemyToFight.name + ', and continue on your journey.');
            console.log("You've been given 5 HP and a " + enemyToFight.item + ".");
            player.hp += 5;
            inFight = false;
            giveItem(enemyToFight.item);
            continue;
        }
        damage = getRandomInt(player.hp / 2) + 1;
        player.hp -= damage;
        console.log(enemyToFight.name + ' attacked you and dealt ' + damage + ' damage.' + ' You have ' + player.hp + ' left.');

        if (player.hp <= 0) {
            inFight = false;
            console.log("You've been killed by" + enemyToFight.name + '.');
            player.isAlive = false;
        }
    }


}
function resetPlayer() {
    turns = 10;
    player.hp = 20;
    player.items = [];
    player.isAlive = true;
    villageDistance = 10;
}
function giveItem(item) {
    player.items.push(item);
}
function startGame() {
    player.name = readlineSync.question("Before we begin, What is your name: ");
    var intro = `Welcome ${player.name}, to the world of text adventure. You've woke in a dark cave in the middle of the forest. \nYou must find your way back home to the village. \nBut beware you have a large journey ahead.`;
    console.log(intro);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function printItems() {
    if (player.items.length > 0) {
        console.log(`You have ${player.hp} HP, and ${player.items} items.`);
    }
    else {
        console.log(`You have ${player.hp} HP.`);
    }
}



// while(response =="yes"){
// while(isAlive){
// console.log("You've found yourself locked in a room.")
// var response2 = readlineSync.question("What would you like to do 1.Look for key, 2. Try to open door, 3. Reach and in hole.:  ");
// switch(response2){
//     case '1': //
//         if(Math.random()*100+1>50){
//             console.log("You found the key!!!");
//             hasKey=true;
//         }
//         else{
//             console.log("You didn't find the key!!!");
//         }
//         break;
//     case '3':
//         if(Math.random()*100+1>50){
//             console.log("Somehow you Died!");
//             isAlive=false;
//         }
//         else{
//             console.log("Somehow you won the Game!");
//             isAlive=false;
//         }
//         break;
// }
// }
// response = readlineSync.question("It looks like you died do you want to play again?: ");
// isAlive=true;
// }