# Blackjack Simulation

This project consists in the implementation of a simple version of a Blackjack simulation, with a scoreboard feature. The goal of the game is for the user to reach 21 points, or as close as possible, without going over 21. The scoreboard feature keeps track of how many games each player has won.  The scoreboard data is programmed to persist even if the user manually refreshes the page.

* When a game is over, there is a button for the user to start a new game, but simply refreshing the page also starts a new game.

[Black Jack Simulation](https://github.com/magabrielaa/web-development/tree/main/black-jack%20simulation)

**Game Rules:**

These rules are simpler than the real game in Vegas, but it is a fun simulation of the game:

1. Play starts with the human player on the left side of the screen (top side in a mobile view).
3. Clicking "Take Another Card" adds another card to the user's hand of cards.
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

Note:
* The `images` subfolder provides all of the card images needed for the game.  
