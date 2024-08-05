
const hangmanimg = document.querySelector(".hangman img");
const worddisplay = document.querySelector(".word_display");
const guesstext=document.querySelector(".guess_text b")
const keyboardDiv = document.querySelector(".keyboard");
const gamemodal = document.querySelector(".game_modal");
const playAgainBtn = document.querySelector(".play_again");


let currentword,correctletters,wrongGuessCount ;
const maxguess=6;

const resetGame=()=>{
    //Reset the game variables
    correctletters=[];   
    wrongGuessCount=0;
    hangmanimg.src=`hangman_images/hangman-${wrongGuessCount}.svg`;
    guesstext.innerText=`${wrongGuessCount} / ${maxguess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false);
    worddisplay.innerHTML=currentword.split("").map(()=>`<li class="letter"></li>`).join("");
    gamemodal.classList.remove("show");
}

const getRandomWord=()=>{
    // for selection of random word from word_list.js
    const{word,hint}=wordlist[Math.floor(Math.random() * wordlist.length)]
    currentword=word;
    console.log(word);
    document.querySelector(".hint_text b").innerText=hint;
    resetGame();
}


const gameover = (isVictory) =>{
    setTimeout(()=>{
        const modalText = isVictory ? `You found the word:`: `The correct word was:`;
        gamemodal.querySelector("img").src=`hangman_images/${isVictory ? 'victory':'lost'}.gif`;
        gamemodal.querySelector("h4").innerText=`${isVictory ? 'Congrats!':'Game Over!'}`;
        gamemodal.querySelector("p").innerHTML=`${modalText} <b> ${currentword}</b>`;
        gamemodal.classList.add("show");

    },300)
}

const initGame=(button, clickletter) =>{
    if(currentword.includes(clickletter)){
        // showing all the correct letters on the display
    [...currentword].forEach((letter,index)=>{
        if(letter === clickletter ){
            correctletters.push(letter);
            worddisplay.querySelectorAll("li")[index].innerText=letter;
            worddisplay.querySelectorAll("li")[index].classList.add("guessed");

        }
    });
}else{
    wrongGuessCount++;
    hangmanimg.src=`hangman_images/hangman-${wrongGuessCount}.svg`
}

button.disabled=true;
guesstext.innerText=`${wrongGuessCount} / ${maxguess}`;



if(wrongGuessCount === maxguess) return gameover(false);
if(correctletters.length === currentword.length) return gameover(true);

}

// for creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText= String.fromCharCode(i);
    keyboardDiv.appendChild(button); 
    button.addEventListener("click",e =>initGame(e.target,String.fromCharCode(i)));   
}


getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);

