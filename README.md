# Giant-squid
Javascript bingo board game


# To run the game:

> Open the terminal and run " node bingo.js" 

You’re already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can’t see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 
 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don’t count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

```bash
22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
 ```

After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

```bash
22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
 ```

After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

```bash
22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
  ```

Finally, 24 is drawn:

```bash
22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
 ```

At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 
.

## Assignment
To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board? Determine this in the following way:

Write a function score that takes the pathname (string) of a text file containing a random order in which to draw numbers and a random set of boards. The function must return the final score (number) of the winning board.
Example
In this interactive session we assume the text files boards01.txt and boards02.txt to be located in the current directory.

```bash
> score("boards01.txt")
4512
> score("boards02.txt")
8580
 ```
<hr/>
<hr/>

 # THE SOLUTION

### 1- Initialization and Imports:

```bash
  const fs = require("fs");
  ```

  > The code begins by importing the fs module, which allows you to interact with the file system to read and write files.

### 2- Shuffle Function:

 ```bash
  function shuffle(array) {...}
  ```

  > This function takes an array as its parameter and shuffles (randomizes) its contents. 
  > The function uses the Durstenfeld shuffle algorithm, an optimized version of the Fisher-Yates algorithm.

### 3- Generating Bingo Boards:

 ```bash
  function generateBoardFile(filename) {...}
  ```
> This function creates Bingo boards:
<ul>
  <li>It generates a shuffled list of numbers from 0 to 26.</li>
  <li>Writes the shuffled numbers to a file, which represents the order in which they'll be drawn.</li>
  <li>It then generates three 5x5 Bingo boards and appends them to the same file.</li>
</ul>


### 4- Parsing the File:

 ```bash
  function parseFile(path) {...}
  ```
> This function reads a Bingo board file. It extracts the drawn numbers and the three Bingo boards stored in the file, 
> returning them in a structured format for further processing.

### 5- Check for a Winning Board:

 ```bash
  function checkBoard(board) {...}
  ```
> This function checks if a given Bingo board has won. It considers a board as winning if:
<ul>
  <li>All numbers in any row have been drawn.</li>
  <li>All numbers in any column have been drawn.</li>
</ul>


### 6- Calculate the Score:

 ```bash
  function score(path) {...}
  ```
  > This function computes the score for the boards in the provided file:
<ul>
  <li>It reads the file and retrieves the drawn numbers and boards.</li>
  <li>For each drawn number, it marks that number on all the boards.</li>
  <li>It then checks each board for a win.</li>
  <li>If a board wins, it computes the score as the sum of the remaining unmarked numbers on the board multiplied by the last drawn number.</li>
</ul>


### 7- Executing the Main Logic:


 ```bash
  generateBoardFile("boards01.txt");
  generateBoardFile("boards02.txt");
  ```

 ```bash
  console.log("> score('boards01.txt')");
  console.log(score("boards01.txt"));
  console.log("> score('boards02.txt')");
  console.log(score("boards02.txt"));
  ```

  <ul>
    <li>It creates two Bingo files: boards01.txt and boards02.txt.</li>
    <li>Then, it calculates the scores for each file and prints them out.</li>
  </ul>

  <hr/>

  <p>In summary, this code simulates a Bingo game. 
  It first generates two sets of Bingo boards in two files. 
  After that, it calculates and displays the score (if any) for each 
  set of boards based on the drawn numbers and the state of the boards.</p>