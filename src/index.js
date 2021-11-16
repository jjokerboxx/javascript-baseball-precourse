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
	// 0을 제거하는 방법 업데이트 하기!!
	this.numberGenerator = () => {
		const number = Math.floor(Math.random() * 10);
		if (number !== 0) {
			return number;
		} else {
			this.numberGenerator();
		}
	};
	this.setAnswer = () => {
		const firstDigit = this.numberGenerator().toString();
		const secondDigit = this.numberGenerator().toString();
		const thirdDigit = this.numberGenerator().toString();
		console.log(`answer : ${firstDigit + secondDigit + thirdDigit}`);
		return firstDigit + secondDigit + thirdDigit;
	};

	this.getUserInput = () => {
		const input = document.querySelector("#user-input").value;
		console.log(input);
		return input;
	};
	this.play = function (computerInputNumbers, userInputNumbers) {
		let outcome = "";
		let strikeCounter = 0;
		let ballCounter = 0;
		let computerInputArray = [...computerInputNumbers];
		let userInputArray = [...userInputNumbers];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (userInputArray[i] === computerInputArray[j] && i === j) {
					strikeCounter++;
					break;
				} else if (userInputArray[i] === computerInputArray[j] && i !== j) {
					ballCounter++;
				}
			}
		}
		if (strikeCounter === 3) {
			outcome = "3스트라이크";
			this.isSolved = true;
		} else if (ballCounter !== 0 || strikeCounter !== 0) {
			outcome = `${ballCounter == 0 ? "" : ballCounter.toString() + "볼"} ${
				strikeCounter == 0 ? "" : strikeCounter + "스트라이크"
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

// <button id="game-restart-button">재시작</button>
const init = () => {
	console.log("init");

	const baseballGame = new BaseballGame();
	const computerInput = baseballGame.setAnswer();
	// console.log(`answer : ${computerInput}`);

	document.querySelector("#submit").addEventListener("click", (e) => {
		e.preventDefault();
		const userInput = baseballGame.getUserInput();
		const result = baseballGame.play(computerInput, userInput);
		baseballGame.printResult(result);
		baseballGame.checkAnswer();
	});
};

init();
