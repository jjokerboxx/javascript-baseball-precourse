"use strict";

// 시작할 때 npx http-server로 실행해야함.

export default function BaseballGame() {
  this.isSolved = false;

  // 재시작 버튼 HTML 생성
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

  // 재시작
  this.restartGame = () => {
    this.isSolved = false;
    this.setAnswer();
    document.querySelector("#game-restart-button").remove();
    document.querySelector("#user-input").value = "";
    document.querySelector("#result").innerHTML = "";
  };

  // 정답 생성
  this.setAnswer = () => {
    let NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let arry = [];
    for (let i = 0; i < 3; i++) {
      const number = Math.floor(Math.random() * 9);
      arry.push(NUMBERS[number]);
    }
    // 중복 제거
    if (arry.length === [...new Set(arry)].length) {
      const answer = arry.join("");
      console.log(typeof answer, answer);
      return answer;
    } else {
      this.setAnswer();
    }
  };

  // 사용자 입력
  this.getUserInput = () => {
    const input = document.querySelector("#user-input").value;
    console.log(input);
    return input;
  };

  // 스트라이크 카운트
  this.countStrike = (computerInputArray, userInputArray) => {
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
    if (strikeArry.length === 3) {
      this.isSolved = true;
    }
    return strikeArry;
  };

  // 볼 카운트
  this.countBall = (computerInputArray, userInputArray) => {
    let ballCounter = 0;
    let coppiedArray = [...computerInputArray];

    for (let i = 0; i < userInputArray.length; i++) {
      let a = userInputArray[i];
      if (coppiedArray.includes(a)) {
        ballCounter++;
        let idx = coppiedArray.indexOf(a);
        coppiedArray.splice(idx, 1);
      }
    }
    return ballCounter;
  };

  // 채점 로직
  this.play = function (computerInputNumbers, userInputNumbers) {
    let outcome = "";
    let computerInputArray = [...computerInputNumbers.toString()];
    let userInputArray = [...userInputNumbers];

    let strikeArry = this.countStrike(computerInputArray, userInputArray);
    let ballCounter = this.countBall(computerInputArray, userInputArray);
    // 출력
    if (ballCounter !== 0 || strikeArry.length !== 0) {
      outcome = `${ballCounter == 0 ? "" : ballCounter.toString() + "볼"} ${
        strikeArry.length == 0 ? "" : strikeArry.length + "스트라이크"
      }`;
    } else {
      outcome = "낫싱";
    }
    return outcome;
  };

  // 결과 출력
  this.printResult = (result) => {
    if (this.isSolved) {
      document.querySelector("#result").innerHTML = "정답을 맞추셨습니다!";
      this.createRestartBTN();
    } else {
      document.querySelector("#result").innerHTML = result;
    }
  };
}

// 인스턴스 생성
const init = () => {
  console.log("init");

  const baseballGame = new BaseballGame();
  const computerInput = baseballGame.setAnswer();

  document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    const userInput = baseballGame.getUserInput();
    const result = baseballGame.play(computerInput, userInput);
    baseballGame.printResult(result);
  });
};

init();
