document.addEventListener("DOMContentLoaded", setupListeners)

// Set up event listeners
function setupListeners() {
  const startGame = document.querySelector("#start-game")
  startGame.addEventListener("click", startNewGame)
  const user = document.querySelector("#take-card")
  user.addEventListener("click", addUserCard)
  const dealer = document.querySelector("#user_hit")
  dealer.addEventListener("click", addDealerCard)
  const reset = document.querySelector("#reset-game")
  reset.addEventListener("click", resetScoreBoard)
}

// Allow game to restart when page is refreshed
window.addEventListener('load', (event) => {startNewGame()});


// Set global variables
let result = document.querySelector("#game-result")
let isGameFinished = false
let isGameOver = false
let userPoints = document.getElementById("user-points")
let dealerPoints = document.getElementById("dealer-points")
let userScore = 0
let dealerScore = 0
let userWins = 0
let dealerWins = 0
let tieTotal = 0
let deck = []
window.dealerDeck = document.querySelector("#dealer_cards")
window.userDeck = document.querySelector("#user_cards")
let allPossibleCards = ["/images/ace_of_clubs.png", "/images/2_of_clubs.png", "/images/3_of_clubs.png", "/images/4_of_clubs.png",
"/images/5_of_clubs.png", "/images/6_of_clubs.png", "/images/7_of_clubs.png", "/images/8_of_clubs.png",
"/images/9_of_clubs.png", "/images/10_of_clubs.png", "/images/jack_of_clubs.png", "/images/queen_of_clubs.png",
"/images/king_of_clubs.png", 

"/images/ace_of_spades.png", "/images/2_of_spades.png", "/images/3_of_spades.png", "/images/4_of_spades.png",
"/images/5_of_spades.png", "/images/6_of_spades.png", "/images/7_of_spades.png", "/images/8_of_spades.png",
"/images/9_of_spades.png", "/images/10_of_spades.png", "/images/jack_of_spades.png", "/images/queen_of_spades.png",
"/images/king_of_spades.png",

"/images/ace_of_hearts.png", "/images/2_of_hearts.png", "/images/3_of_hearts.png", "/images/4_of_hearts.png",
"/images/5_of_hearts.png", "/images/6_of_hearts.png", "/images/7_of_hearts.png", "/images/8_of_hearts.png",
"/images/9_of_hearts.png", "/images/10_of_hearts.png", "/images/jack_of_hearts.png", "/images/queen_of_hearts.png",
"/images/king_of_hearts.png",

"/images/ace_of_diamonds.png", "/images/2_of_diamonds.png", "/images/3_of_diamonds.png", "/images/4_of_diamonds.png",
"/images/5_of_diamonds.png", "/images/6_of_diamonds.png", "/images/7_of_diamonds.png", "/images/8_of_diamonds.png",
"/images/9_of_diamonds.png", "/images/10_of_diamonds.png", "/images/jack_of_diamonds.png", "/images/queen_of_diamonds.png",
"/images/king_of_diamonds.png"]


// Set record of games won by each player, and ties
let userRecord = document.getElementById("user-score")
if (sessionStorage.getItem("userWins")) {
  // Restore User's scoreboard 
  userRecord.textContent = sessionStorage.getItem("userWins")
  userWins = parseInt(sessionStorage.getItem("userWins"))
} else {
  userWins = 0
  userRecord.textContent = userWins
}
sessionStorage.setItem("userWins", userWins);//----------------------------/

let dealerRecord = document.getElementById("dealer-score")
if (sessionStorage.getItem("dealerWins")) {
  // Restore Dealer's scoreboard 
  dealerRecord.textContent = sessionStorage.getItem("dealerWins")
  dealerWins = parseInt(sessionStorage.getItem("dealerWins"))
} else {
  dealerWins = 0
  dealerRecord.textContent = dealerWins
}
sessionStorage.setItem("userWins", userWins);//----------------------------/

let tieRecord = document.getElementById("ties")
if (sessionStorage.getItem("tieTotal")) {
  // Restore Tie scoreboard 
  tieRecord.textContent = sessionStorage.getItem("tieTotal")
  tieTotal = parseInt(sessionStorage.getItem("tieTotal"))
} else {
  tieTotal = 0
  tieRecord.textContent = tieTotal
}
sessionStorage.setItem("tieTotal", tieTotal);//----------------------------/


function startNewGame() {
  deck = allPossibleCards
  isGameFinished = false
  result.innerText = ""
  allCards = [window.userDeck, window.dealerDeck]

  // First remove all cards from each player
  allCards.forEach((parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)}})

  cardsDealt = false

  async function waitUntil(cardsDealt = true) {
    return await new Promise(resolve => { 
      let interval = setInterval( function () {
        userScore = addCard(false)
        dealerScore = addCard(true)
        if (document.querySelectorAll("#user_cards img").length === 2){
          cardsDealt = true
          resolve(Promise)
          clearInterval(interval)
        } else if (document.querySelectorAll("#dealer_cards img").length === 2) {
          cardsDealt = true
          resolve(Promise)
          clearInterval(interval)
        }
    }, 1500)})}
      
  const myPromise = waitUntil(Promise)

  myPromise.then(() => {
    userPoints.innerText = userScore
    dealerPoints.innerText = dealerScore
  // Case when either player wins immediately after starting the game
  if (userScore === 21) {
    result.innerText = "WOHOOOO! YOU SMASHED IT!"
    userWins += 1
    sessionStorage.setItem("userWins", userWins);//----------------------------/
    userRecord.textContent = userWins
    isGameFinished = true

// add class win to result message, for animation purposes
if (result.classList.contains("animate-lose") == true) {
    result.classList.remove("animate-lose")
    result.classList.add('animate-win')
  } else {
    result.classList.add('animate-win');
  }

} else if (dealerScore === 21) {
  result.innerText = "SORRY. YOU GOT BEAT."
  dealerWins += 1
  dealerRecord.textContent = dealerWins
  sessionStorage.setItem("dealerWins", dealerWins);//----------------------------/
  isGameFinished = true

// add class lose to result message, for animation purposes
if (result.classList.contains("animate-win") == true) {
    result.classList.remove("animate-win")
    result.classList.add('animate-lose')
  } else {
    result.classList.add('animate-lose');
  }

} else if (userScore === dealerScore) {
  result.innerText = "SAD. IT WAS A TIE!" 
  tieTotal += 1
  tieRecord.textContent = tieTotal
  sessionStorage.setItem("tieTotal", tieTotal);//----------------------------/
  isGameFinished = true

// add class tie to result message, for animation purposes
if (result.classList.contains("animate-lose") == true) {
    result.classList.remove("animate-lose")
  } else if (result.classList.contains("animate-win") == true) {
    result.classList.remove('animate-win')
  }
  result.classList.add('animate-tie')
}})
}


function addUserCard() {
  let cards = document.querySelectorAll("#user_cards img")

  // Alert user to first start game to open initial cards BEFORE adding a new card
  if (cards[0].getAttribute("src").charAt(7) === "f") {
    window.alert("Click on 'START NEW GAME' to begin")
    return
  } 

  // Stop the player from adding addtional cards when game is already over
  if (isGameFinished == true) {
    window.alert("Game Over! Click on 'START NEW GAME' to play again.")
    return
  }

  async function waitUntil(isGameOver = true) {
    return await new Promise(resolve => { 
      setTimeout(function () {
        userScore = addCard(false)
        if (userScore >= 21){
          isGameOver = true
          resolve(Promise)
        }}, 1000)
    })}

    // Once promise is resolved, announce result
    const myPromise = waitUntil(Promise)
  
    myPromise.then(() => {
      announceResult(dealerScore, userScore)
    });
}


function addDealerCard() {
  // Stop the player from adding additional cards when game is already over
  if (isGameFinished == true) {
    window.alert("Game Over! Click on 'START NEW GAME' to play again.")
    return
  }

  let dealerCards = document.querySelectorAll("#dealer_cards img")
  let dealerScore = countCards(dealerCards)

  // Asynchronous function, wait until dealer cards finalize to get
  // final score and announce result to the user
  async function waitUntil(isGameOver = true) {
    return await new Promise(resolve => { 
      let interval = setInterval(function() {
        dealerScore = addCard(true)
      
        if (dealerScore >= 17) {
          isGameOver == true
          resolve(Promise)
          clearInterval(interval)
        } }, 1000);

    })}

    // Once promise is resolved, announce result
    const myPromise = waitUntil(Promise)
  
    myPromise.then(() => {
      announceResult(dealerScore, userScore)
    });

  // update dealer scoreboard
  userPoints.innerText = userScore 
  dealerPoints.innerText = dealerScore
}


function generateRandomCard (){
  let randomCard = deck[Math.floor(Math.random() * deck.length)] 
  deck = deck.filter(function(e) { return e !== randomCard })
  return randomCard
}


function countCards (cards) {
  let count = 0
  cards.forEach(e => {
    let card = e.getAttribute('src').charAt(8)
    let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10"]
    if (numbers.includes(card) == true) {
      value = parseInt(card)
    } else if (card == "a") {
      value = 11
    }
    else {
      value = 10
    }
    count += value
  })
  return count
}


function resetScoreBoard () {
  result.innerText = ""
  dealerWins = 0
  userWins = 0
  tieTotal = 0
  sessionStorage.setItem("dealerWins", dealerWins);//----------------------------/
  sessionStorage.setItem("userWins", userWins);//----------------------------/
  sessionStorage.setItem("tieTotal", tieTotal);//----------------------------/

  let scoreBoard = document.querySelectorAll("#score-board span")
  scoreBoard[0].innerText = 0
  scoreBoard[1].innerText = 0
  scoreBoard[2].innerText = 0
  }


function addCard(isDealer) {
  randomCard = generateRandomCard ()
  img = document.createElement("img")
  img.src = randomCard
  img.classList.add('start-card-2')
  if (isDealer === true) {
    window.dealerDeck.appendChild(img)
    newPlayerCards = document.querySelectorAll("#dealer_cards img") 
    dealerScore = countCards(newPlayerCards)
    dealerPoints.innerText = dealerScore
    return dealerScore
  } else {
    window.userDeck.appendChild(img)
    newPlayerCards = document.querySelectorAll("#user_cards img") 
    userScore = countCards(newPlayerCards)
    userPoints.innerText = userScore
    return userScore
  }
}
  

function announceResult(dealerScore, userScore) {

  if (dealerScore === 21) {
    dealerWins += 1
    sessionStorage.setItem("dealerWins", dealerWins);//----------------------------/
    dealerRecord.textContent = dealerWins
    result.innerText = "DEALER WINS. YOU LOSE!"
    isGameFinished = true

    // add class lose to result message, for animation purposes
    if (result.classList.contains("animate-win") == true) {
      result.classList.remove("animate-win")
      result.classList.add('animate-lose')
    } else {
      result.classList.add('animate-lose')
    }

  } else if (dealerScore > 21) {
    userWins += 1
    sessionStorage.setItem("userWins", userWins);//----------------------------/
    userRecord.textContent = userWins
    result.innerText = "DEALER LOSES. YOU WON!!!!" 
    isGameFinished = true

    // add class win to result message, for animation purposes
    if (result.classList.contains("animate-lose") == true) {
      result.classList.remove("animate-lose")
      result.classList.add('animate-win')
    } else {
      result.classList.add('animate-win')
    }
    
  } else {

    if (userScore > dealerScore){
      userWins += 1
      sessionStorage.setItem("userWins", userWins);//----------------------------/
      userRecord.textContent = userWins
      result.innerText = "AHA! YOU BEAT THE DEALER!"
      isGameFinished = true

      // add class win to result message, for animation purposes
      if (result.classList.contains("animate-lose") == true) {
        result.classList.remove("animate-lose")
        result.classList.add('animate-win')
      } else {
        result.classList.add('animate-win')
      }
   
    } else if (dealerScore > userScore) {
      dealerWins += 1
      sessionStorage.setItem("dealerWins", dealerWins);//----------------------------/
      dealerRecord.textContent = dealerWins
      result.innerText = "THAT'S A BUMMER. YOU LOST." 
      isGameFinished = true

      // add class lose to result message, for animation purposes
      if (result.classList.contains("animate-win") == true) {
        result.classList.remove("animate-win")
        result.classList.add('animate-lose')
      } else {
        result.classList.add('animate-lose')
      }

    } else if (dealerScore === userScore){
      tieTotal += 1
      sessionStorage.setItem("tieTotal", tieTotal);//----------------------------/
      tieRecord.textContent = tieTotal
      result.innerText = "BORING. THAT'S A TIE...NOBODY WINS."
      isGameFinished = true

      // add class tie to result message, for animation purposes
      if (result.classList.contains("animate-lose") == true) {
        result.classList.remove("animate-lose")
      } else if (result.classList.contains("animate-win") == true) {
        result.classList.remove('animate-win')
      }
      result.classList.add('animate-tie')

    }
  }
  if (userScore  === 21) {
    userWins += 1
    sessionStorage.setItem("userWins", userWins);//----------------------------/
    userRecord.textContent = userWins
    result.innerText = "CONGRATULATIONS!!!!! YOU WON!!!!!!"
    isGameFinished = true

    // add class win to result message, for animation purposes
    if (result.classList.contains("animate-lose") == true) {
      result.classList.remove("animate-lose")
      result.classList.add('animate-win')
    } else {
      result.classList.add('animate-win')
    }
    
  } else if (userScore > 21) {
    dealerWins += 1
    sessionStorage.setItem("dealerWins", dealerWins);//----------------------------/
    dealerRecord.textContent = dealerWins
    result.innerText = "YOU LOST. GAME OVER."
    isGameFinished = true

    // add class lose to result message, for animation purposes
    if (result.classList.contains("animate-win") == true) {
      result.classList.remove("animate-win")
      result.classList.add('animate-lose')
    } else {
      result.classList.add('animate-lose')
    } 
  }
}