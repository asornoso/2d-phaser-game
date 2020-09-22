/*
  This is the intro to the game.
  Displays a splash/loading screen then the menu scene
  Preloads all sprites
  Leads into the main menu then starts the game
*/
import Phaser from "phaser";
import cheesePNG from './assets/toppings/cheese.png'
import chickenPNG from './assets/toppings/chicken.png'
import hamPNG from './assets/toppings/ham.png'
import mushroomPNG from './assets/toppings/mushroom.png'
import olivePNG from './assets/toppings/olive.png'
import onionPNG from './assets/toppings/onion.png'
import bp1PNG from './assets/toppings/pepper_bell_1.png'
import bp2PNG from './assets/toppings/pepper_bell_2.png'
import pineapplePNG from './assets/toppings/pineapple.png'
import tomatoPNG from './assets/toppings/tomato.png'
import splash_background from './assets/backgrounds/splash_screen.jpg'
import game_background from './assets/backgrounds/game_background.jpg'
import player from './assets/player.png'

import ui_left from './assets/UI/left.png'
import ui_right from './assets/UI/right.png'
import ui_start from './assets/UI/start.png'
import ui_play from './assets/UI/play.png'
import ui_pause from './assets/UI/pause.png'
import ui_mute from './assets/UI/mute.png'
import ui_unmute from './assets/UI/unmute.png'

//Import constants
import constants from './constants.js'

//Import scenes
import game_scene from './game.js'
import menu_scene from './menu.js'


let width = window.innerWidth;
let height = window.innerHeight
let splash_screen = new Phaser.Scene('splash_screen')


let config = {
  type: Phaser.AUTO,
  width: width - 2,
  height: height - 2,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 80 }
      }
  },
  scene: [
    splash_screen,
    menu_scene,
    game_scene,
    // gameover_scene
  ],
  debug: true
}

const game = new Phaser.Game(config)

splash_screen.preload = function() {
// Load all assets for the entire game

  // Backgrounds:
  this.load.image("splash_background", splash_background)
  this.load.image("game_background", game_background)


  // Toppings:
  this.load.image("toppings_cheese",cheesePNG)
  this.load.image("toppings_chicken",chickenPNG)
  this.load.image("toppings_ham",hamPNG)
  this.load.image("toppings_mushroom",mushroomPNG)
  this.load.image("toppings_olive",olivePNG)
  this.load.image("toppings_onion",onionPNG)
  this.load.image("toppings_bell_pepper_1",bp1PNG)
  this.load.image("toppings_bell_pepper_2",bp2PNG)
  this.load.image("toppings_pineapple",pineapplePNG)
  this.load.image("toppings_tomato",tomatoPNG)


  //Player(pizza)
  this.load.image("player", player)


  // UI:
  this.load.image("ui_left", ui_left)
  this.load.image("ui_right", ui_right)
  this.load.image("ui_start", ui_start)
  this.load.image("ui_play", ui_play)
  this.load.image("ui_pause", ui_pause)
  this.load.image("ui_mute", ui_mute)
  this.load.image("ui_unmute", ui_unmute)

//Setup progress bar & title+loading text
  let progressBar = this.add.graphics();
  let progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(width * 0.25, height * 0.6, width * 0.5, 30);

//Add title text
  let title = this.make.text({
     x: width/2, y:height/3, text:"Pizza\nStacker",
     style: {...constants.font_configs.xl, color: '#ffffff'}
  }).setOrigin(0.5);


//Add loading text
  let loading = this.make.text({
     x: width* 0.5, y:height * 0.5, text:"Loading....",
     style: {...constants.font_configs.l, color: '#ffffff'}
  }).setOrigin(0.5);

//Setup event listeners to update progressBar/destory bar when complete
  this.load.on('progress', (value) => {
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(width * 0.25, height * 0.6,  width * 0.5 * value, 30);
  })

  this.load.on('complete', () => {
    progressBar.destroy()
    progressBox.destroy()
    this.scene.stop('splash_screen')
    this.scene.start('menu_scene')
  })


}
