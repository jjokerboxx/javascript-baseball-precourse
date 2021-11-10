"use strict";

// 시작할 때 npx http-server로 실행해야함.

export default function BaseballGame() {
	this.setAnswer = () => {
		return Math.floor(Math.random() * 1000);
	};
	this.getUserInput = () => {
		console.log(document.querySelector("#user-input").value);
		return document.querySelector("#user-input").value;
	};
	this.play = function (computerInputNumbers, userInputNumbers) {
		return "결과 값 String";
	};
	this.printAResult = (result) => {
		document.querySelector("#result").value = result;
	};
}

// <button id="game-restart-button">재시작</button>
const init = () => {
	console.log("init");
	document.querySelector("#submit").addEventListener("click", (e) => {
		e.preventDefault();
		const baseballGame = new BaseballGame();
		const computerInput = baseballGame.setAnswer();
		const userInput = baseballGame.getUserInput();
		const result = baseballGame.play(computerInput, userInput);
		baseballGame.printAResult(result);
		console.log("clicked");
	});
};

init();
