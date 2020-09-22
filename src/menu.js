/*
  This is the intro to the game.
  Displays a splash/loading screen then the menu scene
  Preloads all sprites
  Leads into the main menu then starts the game
*/
import Phaser from "phaser";

//Import constants
import constants from './constants.js'

//Import scenes
import game_scene from './game.js'


let width = window.innerWidth;
let height = window.innerHeight
let menu_scene = new Phaser.Scene('menu_scene')



//Create scene after preload
menu_scene.create = function() {
  console.log('menu scene')
  let bg = this.add.image(width/2, height/2, "splash_background")
  let ratio = height / bg.height
  bg.setDisplaySize(bg.width  * ratio - 300, bg.height * ratio)

  let title = this.make.text({
     x: width/2, y:height/3, text:"Pizza\nStacker",
     style: {...constants.font_configs.xl, color: '#0074D9'}
  }).setOrigin(0.5);

  this.startButton = this.add.sprite(width * 0.5, height * 0.7, 'ui_start').setDisplaySize(width*0.3, 135).setOrigin(0.5).setInteractive()
  this.startButton.on('pointerup', () => {
    this.scene.stop('menu_scene')
    this.scene.start('game_scene')
  })

}


export default menu_scene
