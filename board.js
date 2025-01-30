import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_HEIGHT, TILE_SPACING, TILE_WIDTH } from "./constants.js"
import Tile from "./tile.js"

const BOARD_WIDTH = 4
const BOARD_HEIGHT = 4

export default class Board {
    
    constructor(game) {
        this.game = game
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        this.tileCount = 0
        this.addTile()
        this.addTile()
    }

    getRandomPos() {
        if(this.tileCount === BOARD_HEIGHT * BOARD_WIDTH) {
            return -1
        }
        let x, y
        do {
            x = randomIntRange(0, BOARD_WIDTH)
            y = randomIntRange(0, BOARD_HEIGHT)
        } while (this.board[y][x] !== 0);
        return {
            x: x,
            y: y
        }
    }

    addTile() {
        const pos = this.getRandomPos()
        const value = randomIntRange(0, 1) === 0 ? 2 : 4
        const tile = new Tile(this.game, value, pos.x, pos.y)
        this.board[pos.y][pos.x] = tile
        this.game.addEntity(tile)
    }

    update() {
        
    }

    draw(ctx) {
        ctx.fillStyle = '#9C8979'
        ctx.beginPath()
        ctx.roundRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 40)
        ctx.fill()

        ctx.fillStyle = '#BDAC97'
        for(let y = 0; y < BOARD_HEIGHT; y++) {
            for(let x = 0; x < BOARD_WIDTH; x++) {
                ctx.beginPath()
                        ctx.roundRect(
                            (TILE_SPACING * x) + TILE_SPACING + (x * TILE_WIDTH),
                            (TILE_SPACING * y) + TILE_SPACING + (y * TILE_HEIGHT),
                            TILE_WIDTH, TILE_HEIGHT, 40)
                        ctx.fill()
            }
        }
    }
}