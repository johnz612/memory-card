class Game {
  pokemonNames = [
    "pikachu",
    "spearow",
    "charmander",
    "squirtle",
    "bulbasaur",
    "caterpie",
    "butterfree",
    "weedle",
    "pidgey",
    "rattata",
    "clefairy",
    "nidorino",
  ];
  currentPicks = [];
  currentScore = 0;
  highestScore = 0;

  addPick(id) {
    this.currentPicks.push(id);
    this.currentScore++;
  }

  isAlreadyPicked(id) {
    return this.currentPicks.includes(id);
  }

  endGame() {
    if (this.currentScore > this.highestScore) {
      this.highestScore = this.currentScore;
    }
    this.currentPicks = [];
    this.currentScore = 0;
  }
}

export default Game;
