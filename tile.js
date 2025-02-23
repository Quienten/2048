import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_HEIGHT, TILE_SPACING, TILE_WIDTH } from "./constants.js"

const valueToColor = {
    2: "#EEE4DA",
    4: "#EDE0C8",
    8: "#F2B179",
    16: "#F2B179",
    32: "#F67C5F",
    64: "#F65E3B",
    128: "#EDCF72",
    256: "#EDCC61",
    512: "#EDCC61",
    1024: "#EDC53F",
    2048: "#EDC22E"
}

const SLIDE_SPEED = 0.08
const POP_IN_SPEED = 0.2

export default class Tile {

    constructor(game, value, x, y) {
        this.game = game
        this.value = value
        this.x = x
        this.y = y
        this.popIn = this.game.timer.gameTime + POP_IN_SPEED
    }

    update() {
        if(this.game.timer.gameTime >= this.arrival) {
            this.oldX = this.x
            this.oldY = this.y
        }
    }

    moveTo(x, y) {
        let tick = this.game.timer.gameTime
        //console.log(tick)
        this.arrival = tick + SLIDE_SPEED
        this.oldX = this.x
        this.oldY = this.y
        this.x = x
        this.y = y
    }

    moveToAndKill(x, y) {
        this.moveTo(x, y)
        setTimeout(() => {
            this.removeFromWorld = true
        }, SLIDE_SPEED * 1000)
        
    }



    draw(ctx) {
        let x = this.x
        let y = this.y
        let alpha = 1
        if(this.game.timer.gameTime < this.popIn) {
            let progress = Math.min(1, (this.game.timer.gameTime - (this.popIn - POP_IN_SPEED)) / POP_IN_SPEED)
            alpha = 1 * progress
        }
        console.log(alpha)
        ctx.globalAlpha = alpha;
        if(this.game.timer.gameTime < this.arrival) {
            let progress = (this.arrival - this.game.timer.gameTime) / SLIDE_SPEED;
            x = this.oldX + (this.x - this.oldX) * (1 - progress);
            y = this.oldY + (this.y - this.oldY) * (1 - progress);
        }
        ctx.fillStyle = valueToColor[this.value]
        ctx.beginPath()
        ctx.roundRect(
            (TILE_SPACING * x) + TILE_SPACING + (x * TILE_WIDTH),
            (TILE_SPACING * y) + TILE_SPACING + (y * TILE_HEIGHT),
            TILE_WIDTH, TILE_HEIGHT, 40)
        ctx.fill()

        ctx.fillStyle = "#756452"
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText(this.value,
            (TILE_SPACING * x) + TILE_SPACING + (x * TILE_WIDTH) + TILE_HEIGHT / 2,
            (TILE_SPACING * y) + TILE_SPACING + (y * TILE_HEIGHT) + TILE_HEIGHT / 2,
        );
        ctx.globalAlpha = 1;
    }
}