# <u>Simon Game</u>

### Turns
1. Play the desired pattern
    - Generate pattern.
        - Each turn pattern adds one more color.
        - Every few turns 5? it speeds up betwen beeps.  Change timeout to decrease by number of turns.  
            - timeout = 100 - 100 * Math.Floor(numTurns / 5) if timeout == 100 timeout stays at 100.
        - Play the pattern visually.
            - Change style of button.
        - Play sound.

2. Classes
    - Game
        - Generates patterns and handles game logic.
        - (Array) Pattern is a list.
        - (Array) Player will hit buttons that add to another list with the pattern
        - (CheckUserPattern) After every button press compare the turns and if any are out of order it is game over.
        - (NextTurn) Else if the user hits all the same buttons we get a confirmation by lighting all buttons for a sec or two.
        - (PlayPattern) Add a button to pattern.  
        - (ClickEvent) Wait for user.

    - Button
        - (Audio) Audio file.
        - (HTMLButtonElement) Ref to button.
        - (ClickEvent) Handles click/light up event.
            - Play sound.
            - Light button.
        - Constructor SimonButton(string audio, HTMLButtonElement button);