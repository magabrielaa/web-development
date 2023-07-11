# Blackjack Simulation

**20 points**

For easiest viewing of these instructions, you may want to view online or with a Markdown previewer.

### Instructions

Challenge: Implement a simple version of a Blackjack simulation, with a scoreboard feature.

The goal of the game is for the user to reach 21 points, or as close as possible, without going over 21.

I've provided most of the HTML you'll need, but you need to write the JavaScript to make the game function correctly. 

You must also add a "scoreboard" feature to keep track of how many games each player has won.  The scoreboard data should persist even if the user manually refreshes the page.

* HINT: When a game is over, you can provide a link or button for the user to start a new game, but simply refreshing the page should also start a new game.
* ANOTHER HINT: Research `document.localStorage` and/or `document.sessionStorage` to help preserve scoreboard data across page refreshes.

**Game Rules:**

These rules are simpler than the real game in Vegas, but should still
give you a taste of the challenges of real-world JavaScript programaming.

1. Play starts with the human player on the left side of the screen (top side in a mobile view).
3. Clicking "Take Another Card" should add another card to the user's hand of cards.
4. If the user reaches exactly 21 points, the user instantly wins!
5. If the user goes OVER 21 points, the user instantly loses.
6. If the user clicks "Stand", it becomes the dealer's turn to take cards.
7. The dealer MUST continue to take more cards until the dealer's total is 17 or higher.
8. If the dealer reaches exactly 21 points, the dealer instantly wins.
9. If the dealer goes over 21 points, the dealer instantly loses.
10. If the dealer reaches 17, 18, 19, or so points, the dealer must stop taking cards.  The winner is whoever has more points in their hand. If the dealer's hand is equal to the value of the user's hand, it's a tie and nobody wins. 

Card values are determined as follows:

1. Cards 2 through 9 are worth their face value.
2. 10, Jack, Queen, and King are each worth 10 points.
3. Aces are always worth 11 points. (This is a simplification from the real game)

Please note:

* The `images` subfolder provides all of the card images that you will need.  
* There is also a `face_down.png` image in case you choose to use it.
* You can choose to write your JS directly in the index.html file or create a separate JS file.
* You may edit the given HTML as needed with any HTML/CSS code, including any CSS framework, but you cannot use a JS framework.
* BIG HINT: All of the image filenames that I've provided follow a specific naming convention in order to make it easier for you to programmatically determine the `src` attribute values for the cards.

**Grading Rubric**

* 10 points: 1 point per rule implemented above
* 5 points: Dealer cards are animated in some fashion, with a 2-second pause between each card.  (HINT: There are lots of CSS animation techniques available that you'll need to research.  Try starting with https://www.w3schools.com/css/css3_animations.asp)
* 3 points: A "scoreboard" feature to keep track of how many games each side has won.  
* 2 points: Provide a way for the user to reset the scoreboard to 0-0.

