/*jshint esversion: 6 */
const redAudio = document.querySelector('.red audio')
const blueAudio = document.querySelector('.blue audio')
const greenAudio = document.querySelector('.green audio')
const yellowAudio = document.querySelector('.yellow audio')

class UI {
  // Update score
  updateScore() {}
}

class Game {
  constructor(computer, player, score) {
    this.computer = computer
    this.player = player
    this.score = score
    this.tags = ['red', 'green', 'yellow', 'blue']
    this.tempArr = []
  }

  // Play audio file
  playAudio(tag) {
    let audio
    if (tag === 'red') audio = redAudio
    if (tag === 'blue') audio = blueAudio
    if (tag === 'green') audio = greenAudio
    if (tag === 'yellow') audio = yellowAudio
    audio.play()
    // stop the audio after 1s
    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
    }, 1000)
  }

  // Repeat the audio
  repeatAudio() {
    const arr = this.computer
  }

  // Set computer array with random tag
  setRandomTag() {
    const randNum = Math.floor(Math.random() * 4)
    this.computer.push(this.tags[randNum])
    return this.tags[randNum]
  }

  // Validate player Tags
  validateTag(tag) {
    this.player.push(tag)
    console.log(this.player)
    this.player.forEach((tag, i) => {
      // Checks for each player tag against computer tags
      if (tag !== this.computer[i].toString()) {
        this.gameOver()
      }

      // Checks player tags array against computer array
      if (this.player.length === this.computer.length) {
        if (this.player.toString() === this.computer.toString()) {
          this.newRound()
        } else {
          this.gameOver()
        }
      }
    })
  }

  // Game over
  gameOver() {
    console.log('Game Over ', this.score)
    this.computer = []
    this.player = []
    this.score = 0
  }

  // New round
  newRound() {
    const randomTag = this.setRandomTag()
    this.playAudio(randomTag)
    this.score += 1
    this.player = []
    console.log('Computer : ', game.computer)
    console.log('Score: ', game.score)
  }
}

// Init Game object
const game = new Game([], [], 0)

// Play Button is clicked
document.querySelector('.btn-play').addEventListener('click', e => {
  game.newRound()
})

// Tags clicked
document.querySelector('#game').addEventListener('click', e => {
  // Red tag is clicked
  if (e.target.classList[1] === 'red') {
    game.validateTag('red')
    game.playAudio('red')
  }
  // Blue tag is clicked
  if (e.target.classList[1] === 'blue') {
    game.validateTag('blue')
    game.playAudio('blue')
  }
  // Green tag is clicked
  if (e.target.classList[1] === 'green') {
    game.validateTag('green')
    game.playAudio('green')
  }
  // Yellow tag is clicked
  if (e.target.classList[1] === 'yellow') {
    game.validateTag('yellow')
    game.playAudio('yellow')
  }
})
