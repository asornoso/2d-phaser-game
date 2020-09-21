/*
  This is the game scene
  Displays a background and ui components
  Contains logic of the game
*/
import Phaser from "phaser";
//Import constants
import constants from './constants.js'

let game_scene = new Phaser.Scene('game_scene')

let width = window.innerWidth;
let height = window.innerHeight

game_scene.create = function() {
  console.log(width, height)
  let bg = this.add.image(0, 0, "game_background")
  bg.setOrigin(0,0)
  bg.setDisplaySize(width, height)



}

game_scene.update = function(){


}

export default game_scene
