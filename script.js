        // Variables definition
        let N = 3;
        const containerDiv = document.getElementById("container");
        let xIsNext = true;         //A flag to determine whose turn is it
        let pointsToWin = 0;         //Win state occures if == 3
        let XmarkedBoxes = [];      //Records every X marked button in current round
        let OmarkedBoxes = [];      //Records every O marked button in current round
        let tempArray = [];         //Used in isSubset funct to store a different nested winValue array
        let tempWinValues = [];
        let winValues = [];
        let childElement;
        let childElementLength;
        let currentMarkString;
        let currentMarkHistory;

        (function init(){
            createButtons(N);
        })();

        function createButtons(n) {
            let c1;
            let c2 = 0;
            for (c1 = 0; c1 < n ** 2; c1++) {
                containerDiv.insertAdjacentHTML("beforeend", `<button class="gameButton" value = ${c1} onclick="mark()"></button>`);
                c2++;
                if (c2 == n) {
                    containerDiv.insertAdjacentHTML("beforeend", '<br><br><br>');
                    c2 = 0;
                }
            }
            createWinValues();
        }

        function createWinValues() {
            let v;
            let p;
            //Vertical Wins
            for (p = 0; p < N; p++) {
                for (v = p; v < N ** 2; v = v + +N) {
                    tempWinValues.push(v);
                }
                winValues.push(tempWinValues);
                tempWinValues = [];
            }
            //Horizontal Wins
            for (p = 0; p < N ** 2; p = p + +N) {
                for (v = p; v < p + +N; v++) {
                    tempWinValues.push(v);
                }
                winValues.push(tempWinValues);
                tempWinValues = [];
            }
            //Diagonal Wins
            //First Diagonal
            for (v = 0; v < N ** 2; v = v + (+N + 1)) {
                tempWinValues.push(v);
            }
            winValues.push(tempWinValues);
            tempWinValues = [];
            //Second Diagonal
            for (v = N-1; v < (N ** 2) - 1; v = v + (N-1)) {
                tempWinValues.push(v);
            }
            winValues.push(tempWinValues);
            tempWinValues = [];
            console.log(winValues);
        }

        function destroyButtons(){
            containerDiv.innerHTML = '';
        }

        function scale(){
            const enteredBoardSize = document.getElementById("boardSize").value;
            if(enteredBoardSize <= 10 && enteredBoardSize >= 3){
            N = enteredBoardSize;
            reset();
            winValues = [];
            destroyButtons();
            createButtons(N);
            console.log(enteredBoardSize);
            }
            else{
                alert("Your entered number is outside of acceptable range!");
            }
        }

        function mark() {
            if (event.target.innerText == "" && declareWinner.innerText == "") {                   //Skips over the entire funtion if button isnt empty or game won
                xIsNext == true ? (currentMarkHistory = XmarkedBoxes) : (currentMarkHistory = OmarkedBoxes);
                currentMarkHistory == XmarkedBoxes ? event.target.innerText = "X" : event.target.innerText = "O";                                   //Marks the button
                currentMarkHistory.push(event.target.value);                                        //Pushes button reference num into an array to record it's marked
                console.log(currentMarkHistory);
                if (currentMarkHistory.length >= N) {
                    isSubset(currentMarkHistory, winValues, currentMarkHistory.length);            //Calls Subset func to check for a win state
                }
                xIsNext = xIsNext ? false : true;                                                  //Toggles xIsNext so that a different player starts each turn
            }
        }

        function isSubset(arr1, arr2, m1) {
            let i = 0;
            let j = 0;
            let k = 0;
            for (k = 0; k < (2 * N + 2); k++) {                       //The most outer loop runs as many win states as there are
                tempArray = arr2[k];                        //On each iteration, tempArray stores a different nested winState array
                for (i = 0; i < N; i++) {                   // ==========>
                    for (j = 0; j < m1; j++) {               // =>2d array, outer runs 3 times, inner for as many X || O marked boxes there are
                        if (tempArray[i] == arr1[j]) {      // checks if a number recorded in X/OmarkedBoxes exists in current win state array(stored in tempArray)
                            pointsToWin++;                   //If so, count +1 towards win state (requires 3)
                            console.log(pointsToWin);
                        }
                    }

                    if (pointsToWin == N) {                  //If all win points acheived in current iteration of k loop. induce win state
                        arr1 == XmarkedBoxes ? (declareWinner.innerText = "X wins!", Xcol.innerText++) : (declareWinner.innerText = "O wins!", Ocol.innerText++);
                    }
                }
                pointsToWin = 0;                             //If not, reset counter and check the next win state(next iteration of k loop)
            }
        }

        function reset() {                                  //Resets the board

            childElement = document.getElementById("container").querySelectorAll("button"); //stores an array of buttons
            childElementLength = childElement.length;
            for (let i = 0; i < childElementLength; i++) {
                childElement[i].innerText = "";                                                 //Resets text in each button in array
            }
            xIsNext = true;                     //Resets vars and win declaration to default values
            XmarkedBoxes = [];
            OmarkedBoxes = [];
            declareWinner.innerText = "";
        }
