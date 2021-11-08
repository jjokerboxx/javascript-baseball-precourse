export default function BaseballGame() {
	this.setAnswer = () => {
		return Math.floor(Math.random() * 1000);
	};
	this.getUserInput = () => {
		return document.querySelector("#user-input").value;
	};
	this.play = function (computerInputNumbers, userInputNumbers) {
		return "결과 값 String";
	};
}

// <button id="game-restart-button">재시작</button>

const baseballGame = new BaseballGame();
