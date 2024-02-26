// @ts-nocheck
import React, { useEffect, useRef, MutableRefObject, Dispatch, SetStateAction } from 'react';
// import Fighter from './models';
// import styles from "./page.module.css"


interface FightGameProps {
  timerRef: MutableRefObject<number>;
  setIsCombat: Dispatch<SetStateAction<boolean>>;
}

const FightGame: React.FC<FightGameProps> = ({ timerRef, setIsCombat }) => {
  let animationId;
  const playerRef = useRef({});
  const enemyRef = useRef({});
  const fighterControlListener = (event) => {

    if (!playerRef.current.dead) {
      switch (event.key) {
  
        case ' ':
          enemyRef.current.takeHit()
          gsap.to('#enemyHealth', {
            width: enemyRef.current.health + '%'
          })
  
        break
      }
    }
  
    if (!enemyRef.current.dead) {
      switch (event.key) {
  
        case 'ArrowDown':
          playerRef.current.takeHit()
          gsap.to('#playerHealth', {
            width: playerRef.current.health + '%'
          })
  
        break
      }
    }
  }

  useEffect(() => {
    const displayText = document.getElementById('displayText');
    displayText.style.display = 'none';
    displayText.innerHTML = 'Tie';

    createFight(animationId, fighterControlListener, playerRef, enemyRef, timerRef, setIsCombat)
    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', fighterControlListener);
    };
  }, [{}]);
  
  return (
    <div id="fightGameContainer">
      <div className="redContainer">
        <div className="smallerRedContainer">
            <div className="playerHealthContainer">
                <div className="playerRedHealth"></div>
                <div 
                    id="playerHealth"
                    className="playerHealth"
                ></div>
            </div>

            <div id="timer" className="timer">100</div>

            <div className="enemyHealthContainer">
                <div className="enemyRedHealth"></div>
                <div id="enemyHealth" className="enemyHealth"></div>
            </div>
            <div></div>
        </div>
        <div id="displayText" className="displayTaiText" style={{display: "none"}}>Tie</div>
        <canvas></canvas>
      </div>
    </div>
  );
};

export default FightGame;


function createFight(animationId, fighterControlListener, playerRef, enemyRef, timerRef, setIsCombat) {

  
  function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)

    const displayText = document.getElementById('displayText');

    displayText.style.display = 'flex';
    if (player.health === enemy.health) {
      displayText.innerHTML = 'Tie';
    } else if (player.health > enemy.health) {
      displayText.innerHTML = 'Player 1 Wins';
    } else if (player.health < enemy.health) {
      displayText.innerHTML = 'Player 2 Wins';
    }
    
    setTimeout( () => {
      displayText.style.display = 'none'
      displayText.innerHTML = 'Tie'
    } , 2500 )
  }
  
  let timer = timerRef.current;
  let timerId
  function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector('#timer').innerHTML = timer
    }
  
    if (timer === 0) {
      determineWinner({ player, enemy, timerId })
    }
  }


  // --------------------------------------------------------------------------------------------------------------------------------------------------



  // Models
  class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
    }

    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }

    animateFrames() {
      this.framesElapsed++

      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }

    update() {
      this.draw()
      this.animateFrames()
    }
  }


  class Fighter extends Sprite {
    constructor({
      position,
      color = 'red',
      imageSrc,
      attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
      super({
        position,
        imageSrc,
      })

      this.width = 50
      this.height = 150
      this.lastKey
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset: attackBox.offset,
        width: attackBox.width,
        height: attackBox.height
      }
      this.color = color
      this.isAttacking
      this.health = 100
      this.dead = false
    }

    update() {
      this.draw()

      // attack boxes
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y
    }

    attack() {
      this.isAttacking = true
    }

    takeHit() {
      this.health -= Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    }

  }
    
  
  
  // --------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  
  
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  
  canvas.width = 1024
  canvas.height = 576
  
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  decreaseTimer()

  const background = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: './img/background_4.jpg'
  })
  
  const house = new Sprite({
    position: {
      x: 10,
      y: 300
    },
    imageSrc: './img/game2.png',
    scale: 0.65,
    framesMax: 6
  })
  
  const house_1 = new Sprite({
    position: {
      x: 880,
      y: 330
    },
    imageSrc: './img/game2.png',
    scale: 0.8,
    framesMax: 6
  })
  
  const house_2 = new Sprite({
    position: {
      x: 780,
      y: 340
    },
    imageSrc: './img/game2.png',
    scale: 0.9,
    framesMax: 6
  })
  
  const house_2_5 = new Sprite({
    position: {
      x: 975,
      y: 350
    },
    imageSrc: './img/game2.png',
    scale: 0.9,
    framesMax: 6
  })
  
  const house_3 = new Sprite({
    position: {
      x: 800,
      y: 380
    },
    imageSrc: './img/game2.png',
    scale: 1,
    framesMax: 6
  })
  
  
  const player = new Fighter({
    position: {
      x: 200,
      y: 700
    },
    imageSrc: '',
    attackBox: {
      offset: {
        x: 100,
        y: 50
      },
      width: 70,
      height: 30
    }
  })

  playerRef.current = player;
  
  const enemy = new Fighter({
    position: {
      x: 700,
      y: 700
    },
    color: 'blue',
    imageSrc: '',
    attackBox: {
      offset: {
        x: -170,
        y: 50
      },
      width: 170,
      height: 50
    }
  })

  enemyRef.current = enemy;
  
  
  function animate() {
    animationId = window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
  
    house.update()
    house_1.update()
    house_2.update()
    house_2_5.update()
    house_3.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  
    player.update()
    enemy.update()
  }
  

  animate();

  window.addEventListener('keydown', fighterControlListener);
  
}



