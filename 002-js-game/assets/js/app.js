const modalInfo = document.querySelector('.modalInfo');
const modalCongrats = document.querySelector('.modalCongrats');
const info = document.querySelector('.infoButton');
const cards  = document.querySelectorAll('.box');
const closeInfo = document.querySelector('.closeInfo');
const closeCongrats = document.querySelector('.closeCongrats');
const overlay = document.querySelector('.overlay');
const startGameBtn = document.querySelector('.startGame');
const modalGameOver = document.querySelector('.modalGameOver');
const countDown = document.getElementById('time');
const refresh = document.querySelector('.refresh');

let startingMinutes = 1;
let time = startingMinutes * 60
let cardFlipped = false;
let lockCard = false;
let firstCard, secondCard;
let matchedCard = 0;
let clicks = 0;

//X button
const closeInfoBtn = function(){
   modalInfo.classList.add('hidden');
   overlay.classList.add('hidden');
   startTime();
}
closeInfo.addEventListener('click', closeInfoBtn);

//Info Button
const InfoButton = function(){
   modalInfo.classList.remove("hidden");
   overlay.classList.remove("hidden");
   closeInfo.classList.remove("hidden");
   clearInterval(remainingTime);
}
info.addEventListener('click', InfoButton);


for(const card of cards){
   card.addEventListener('click', flipCard);
} 


//countdown Function
function startTime(){
   remainingTime = setInterval(function (){
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if(seconds < 10){
         seconds = '0' + seconds;
      }
      else{
         seconds = seconds;
      }
      countDown.innerHTML =`${minutes}:${seconds}`;
      
      if(time === 0){
         clearInterval(remainingTime);
         document.getElementById("time").innerHTML = "TIME'S UP";
         modalGameOver.classList.remove('hidden');
         overlay.classList.remove('hidden');
      }
      else{
         time = time;
         time--;
      }
   },1000)
}

//Changing the postition of the cards
function shuffleCards(){
   for(const card of cards){
     let random = Math.floor(Math.random() * 16);
     card.style.order = random;
   }
}

//Start game button
function startGame(){
   shuffleCards();
   startTime();
   modalInfo.classList.add('hidden');
   overlay.classList.add('hidden');
   startGameBtn.classList.add('hidden');
}


function flipCard(){
   if(lockCard == true) return;
   if(this == firstCard) return;
   this.classList.add('flip');

   if(!cardFlipped){
      cardFlipped = true;
      firstCard = this;
      clicks++;
   }

   else{
      secondCard = this;
      checkMatch();
      clicks++;
   }
}

//checking for matching emojis
function checkMatch(){
   if( firstCard.dataset.emoji === secondCard.dataset.emoji){
      firstCard.removeEventListener('click',flipCard);
      secondCard.removeEventListener('click',flipCard);

      resetCard();
      matchedCard++;
      clicks++;

      if(matchedCard === 8){
         modalCongrats.classList.remove('hidden');
         overlay.classList.remove('hidden');
         document.getElementById('clicks').innerHTML = "Number of clicks: " + clicks ;
         document.getElementById('seconds').innerHTML = "Time left: " + countDown.innerHTML + " seconds";
         document.getElementById('time').innerHTML = "1:00";
         clearInterval(remainingTime);
      }
   }

   else{
   lockCard = true
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetCard();
      }, 500)
   }
}

//Play again button
function playAgain(){
   for(const card of cards){
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
   } 
   modalGameOver.classList.add('hidden');
   modalCongrats.classList.add('hidden');
   overlay.classList.add('hidden');
   matchedCard = 0;
   clicks = 0;
   startingMinutes = 1;
   time = startingMinutes * 60;
   startTime();
   shuffleCards();
}

//Refresh button
function resfresh(){
   for(const card of cards){
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
   } 
   matchedCard = 0;
   clicks = 0;
   startingMinutes = 1;
   time = startingMinutes * 60;
   shuffleCards();
}
refresh.addEventListener('click', resfresh);

function resetCard(){
   cardFlipped = false;
   lockCard = false;
   firstCard = null;
   secondCard = null;
}

