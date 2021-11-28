"use strict";

// 시작할 때 npx http-server로 실행해야함.

export default function BaseballGame() {
  this.isSolved = false;
  this.createRestartBTN = () => {
    let $restartBTN = document.createElement("button");
    $restartBTN.id = "game-restart-button";
    $restartBTN.innerText = "재시작";
    document.querySelector("#result").appendChild($restartBTN);
    document
      .querySelector("#game-restart-button")
      .addEventListener("click", (e) => {
        this.restartGame();
      });
  };
  this.checkAnswer = () => {
    if (this.isSolved === true) {
      this.createRestartBTN();
    }
  };
  this.restartGame = () => {
    this.isSolved = false;
    this.setAnswer();
    document.querySelector("#game-restart-button").remove();
    document.querySelector("#user-input").value = "";
    document.querySelector("#result").innerHTML = "";
  };

  this.setAnswer = () => {
    let NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let arry = [];
    for (let i = 0; i < 3; i++) {
      const number = Math.floor(Math.random() * 9);
      arry.push(NUMBERS[number]);
    }
    const answer = arry.join("");
    console.log(answer);
    return answer;
  };

  this.getUserInput = () => {
    const input = document.querySelector("#user-input").value;
    console.log(input);
    return input;
  };
  this.play = function (computerInputNumbers, userInputNumbers) {
    let outcome = "";
    let ballCounter = 0;
    let computerInputArray = [...computerInputNumbers];
    let userInputArray = [...userInputNumbers];
    let strikeArry = [];
    for (let i = 0; i < 3; i++) {
      if (userInputArray[i] === computerInputArray[i]) {
        strikeArry.push(userInputArray[i]);
      }
    }
    strikeArry.forEach((a) => {
      computerInputArray.splice(computerInputArray.indexOf(a), 1);
      userInputArray.splice(userInputArray.indexOf(a), 1);
    });
    console.log(computerInputArray, userInputArray);

    if (strikeArry.length === 3) {
      return "3스트라이크";
      this.isSolved = true;
    }

    // 3 볼일 때 경우의 수 수정하기!!
    userInputArray.forEach((a) => {
      if (computerInputArray.includes(a)) {
        ballCounter++;
      }
    });

    if (ballCounter !== 0 || strikeArry.length !== 0) {
      outcome = `${ballCounter == 0 ? "" : ballCounter.toString() + "볼"} ${
        strikeArry.length == 0 ? "" : strikeArry.length + "스트라이크"
      }`;
    } else {
      outcome = "낫싱";
    }
    return outcome;
  };

  this.printResult = (result) => {
    document.querySelector("#result").innerHTML = result;
  };
}

const init = () => {
  console.log("init");

  const baseballGame = new BaseballGame();
  const computerInput = baseballGame.setAnswer();

  document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    const userInput = baseballGame.getUserInput();
    const result = baseballGame.play(computerInput, userInput);
    baseballGame.printResult(result);
    baseballGame.checkAnswer();
  });
};

init();
