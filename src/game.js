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
  this.scene_variables = {}
  this.scene_variables.speed = 15
  this.scene_variables.score = 0
  this.scene_variables.lives = 4
  this.scene_variables.topping_sprite_list = [
    "toppings_cheese", "toppings_chicken", "toppings_ham",
    "toppings_mushroom", "toppings_olive", "toppings_onion",
    "toppings_bell_pepper_1", "toppings_bell_pepper_2",
     "toppings_pineapple", "toppings_tomato"
  ]
  this.scene_variables.spawn_time = 1800 //ms
  this.scene_variables.last_spawn = Date.now()
  this.scene_variables.move_left = false
  this.scene_variables.move_right = false

  this.toppings_group = this.physics.add.group()
  this.bad_toppings_group = this.physics.add.group()

  //setup background image
  let bg = this.add.image(width/2, height/2, "game_background")
  let ratio = height / bg.height
  bg.setDisplaySize(bg.width  * ratio - 700, bg.height * ratio)


  //Add player
  this.player_sprite = this.physics.add.sprite(width * 0.5, height * 0.8, "player")
  this.player_sprite.setScale(0.75)
  this.player_sprite.setCollideWorldBounds(true)
  this.player_sprite.body.setAllowGravity(false)
  console.log(this.player_sprite)



  //Setup UI controls
  this.left_control = this.add.image(width * 0.08, height * 0.95, "ui_left").setInteractive()
  this.left_control.setScale(1.7)

  this.right_control = this.add.image(width * 0.92, height * 0.95, "ui_right").setInteractive()
  this.right_control.setScale(1.7)

  //Move player on touch down
  this.left_control.on('pointerdown', ()=> {
    this.scene_variables.move_left = true
    this.scene_variables.move_right = false
  })
  this.right_control.on('pointerdown', ()=> {
    this.scene_variables.move_right = true
    this.scene_variables.move_left = false
  })

  //Move player on touch down
  this.left_control.on('pointerup', ()=> {
    this.scene_variables.move_left = false
  })
  this.right_control.on('pointerup', ()=> {
    this.scene_variables.move_right = false
  })

  //Setup game text
  //Score:
  this.score_text = this.make.text({
    x: width * 0.02, y: 10, text: "Score: "+this.scene_variables.score,
    style: {...constants.font_configs.m, color: "#ffffff"}
  })

  //Lives:
  this.lives_text = this.make.text({
    x: width * 0.75, y: 10, text: "Lives: "+this.scene_variables.lives,
    style: {...constants.font_configs.m, color: "#ffffff"}
  })

}

game_scene.update = function(){

  if(this.scene_variables.move_right)
    this.player_sprite.x += this.scene_variables.speed
  else if(this.scene_variables.move_left)
    this.player_sprite.x -= this.scene_variables.speed


  //Generate toppings
  //30% of the time generate bad topping
  //70% of the time generate good toppping
  //Generate 10 toppings per min at random intervals
  let now = Date.now()
  if(now - this.scene_variables.last_spawn >= this.scene_variables.spawn_time)
  {
    let t
    if(Math.random() < 0.3){
      t = this.bad_toppings_group.create(Math.floor(Math.random() * width - 200) + 100, -200, this.scene_variables.topping_sprite_list[Math.floor(Math.random() * 10)])
      t.tint = 0x800080
    }
    else
      t = this.toppings_group.create(Math.floor(Math.random() * width - 200) + 100, -200, this.scene_variables.topping_sprite_list[Math.floor(Math.random() * 10)])
    t.setScale(3)
    this.scene_variables.last_spawn = now
    this.scene_variables.spawn_time -= 10
  }


  //Detect collisions between player and good toppings to increase score
  this.physics.add.overlap(this.player_sprite, this.toppings_group, (player, topping) => {
    this.scene_variables.score += 1
    this.score_text.setText("Score: "+ this.scene_variables.score)
    topping.destroy()
  }, null, this);

  //Detect collisions between player and bad toppings to reduce lives
  this.physics.add.overlap(this.player_sprite, this.bad_toppings_group, (player, topping) => {
    this.scene_variables.lives -= 1
    this.lives_text.setText("Lives: "+ this.scene_variables.lives)
    topping.destroy()
  }, null, this);

  //Remove when off screen
  let children = this.toppings_group.children.getArray()
  for(let i = 0; i < children.length; i++){
    if(children[i].y > height + 100){
      children[i].destroy()
    }
  }

  //Check for end game
  if(this.scene_variables.lives <= 0){
    this.scene.stop('game_scene')
    this.scene.start('menu_scene')
  }
}


export default game_scene
