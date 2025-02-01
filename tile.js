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

export default class Tile {

    constructor(game, value, x, y) {
        this.game = game
        this.value = value
        this.x = x
        this.y = y
    }

    update() {

    }

    moveTo(x, y) {
        tick = this.game.timer.gameTime
        this.arrival = tick + 1
        this.newX = x
        this.newY = y
    }

    draw(ctx) {
        ctx.fillStyle = valueToColor[this.value]
        ctx.beginPath()
        ctx.roundRect(
            (TILE_SPACING * this.x) + TILE_SPACING + (this.x * TILE_WIDTH),
            (TILE_SPACING * this.y) + TILE_SPACING + (this.y * TILE_HEIGHT),
            TILE_WIDTH, TILE_HEIGHT, 40)
        ctx.fill()

        ctx.fillStyle = "#756452"
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText(this.value,
            (TILE_SPACING * this.x) + TILE_SPACING + (this.x * TILE_WIDTH) + TILE_HEIGHT / 2,
            (TILE_SPACING * this.y) + TILE_SPACING + (this.y * TILE_HEIGHT) + TILE_HEIGHT / 2,
        );
    }
}