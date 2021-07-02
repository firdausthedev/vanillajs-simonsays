/*jshint esversion: 8 */
const redAudio = document.querySelector('.red audio')
const blueAudio = document.querySelector('.blue audio')
const greenAudio = document.querySelector('.green audio')
const yellowAudio = document.querySelector('.yellow audio')

class UI {
  // Update score
  updateScore(score) {
    document.querySelector('h1').innerHTML = 'Simon Says'
    document.querySelector('h2').innerHTML = `Score ${score}`
  }

  // Animate tag
  animateTag(tag) {
    document.querySelector(`.${tag}`).classList.add('blink')
    setTimeout(function () {
      document.querySelector(`.${tag}`).classList.remove('blink')
    }, 300)
  }

  // Hide start button
  hideStartButton() {
    document.querySelector('.btn-play').style.display = 'none'
  }

  // Game Over screen
  showGameOver() {
    document.querySelector('.btn-play').style.display = 'block'
    document.querySelector('h1').innerHTML = 'Game Over'
    document.body.classList.add('gameover-bg')
    setTimeout(function () {
      document.body.classList.remove('gameover-bg')
    }, 100)
  }
}

class Game {
  constructor(computer, player, score) {
    this.computer = computer
    this.player = player
    this.score = score
    this.tags = ['red', 'green', 'yellow', 'blue']
    this.isPlayerTurn = false
  }

  // Play single audio file
  playAudio(tag) {
    let audio
    if (tag === 'red') audio = redAudio
    if (tag === 'blue') audio = blueAudio
    if (tag === 'green') audio = greenAudio
    if (tag === 'yellow') audio = yellowAudio

    audio.play()
    // pause the audio after 1s
    setTimeout(function () {
      audio.pause()
      audio.currentTime = 0
    }, 1000)
  }

  // Show ui and audio pattern
  gamePattern() {
    const timer = ms => new Promise(res => setTimeout(res, ms))

    const load = async () => {
      for (let i = 0; i < this.computer.length; i++) {
        this.playAudio(this.computer[i])
        ui.animateTag(this.computer[i])
        await timer(1000)
      }
    }

    load()
  }

  // Set computer array with random tag
  setRandomTag() {
    const randNum = Math.floor(Math.random() * 4)
    this.computer.push(this.tags[randNum])
  }

  // Validate player Tags
  validateTag(tag) {
    this.player.push(tag)
    this.player.forEach((tag, i) => {
      try {
        if (tag !== this.computer[i].toString()) {
          this.gameOver()
        }
        // Checks player tags array against computer array
        if (this.player.length === this.computer.length) {
          if (this.player.toString() === this.computer.toString()) {
            if (this.score !== 0) {
              this.nextRound()
              this.player = []
            }
          } else {
            this.gameOver()
          }
        }
      } catch (error) {
        console.log(error)
      }
      // Checks for each player tag against computer tags
    })
  }

  // Next round
  nextRound() {
    this.setRandomTag()
    this.score += 1
    ui.updateScore(this.score)

    // Play the audio without delay if the game just started
    if (this.score == 1) {
      this.gamePattern()
    } else {
      // Add 1 second delay before audio start
      setTimeout(() => {
        this.gamePattern()
      }, 2000)
    }
  }

  // Game over
  gameOver() {
    this.isPlayerTurn = false
    ui.showGameOver()
    console.log('Game Over ', this.score)
    this.computer = []
    this.player = []
    this.score = 0
  }
}

// Init Game object
const game = new Game([], [], 0)
const ui = new UI()

// Play Button is clicked
document.querySelector('.btn-play').addEventListener('click', e => {
  game.isPlayerTurn = true
  game.nextRound()
  ui.hideStartButton()
})

// Tags clicked
document.querySelector('#game').addEventListener('click', e => {
  game.tags.forEach(tag => {
    if (e.target.classList[1] === tag) {
      if (game.isPlayerTurn) {
        game.validateTag(tag)
        ui.animateTag(tag)
        game.playAudio(tag)
      }
    }
  })
})
