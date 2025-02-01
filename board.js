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
        const value = randomIntRange(0, 2) === 0 ? 2 : 4
        const tile = new Tile(this.game, value, pos.x, pos.y)
        this.board[pos.y][pos.x] = tile
        this.game.addEntity(tile)
    }

    shift(direction) {
        const directions = {
            'up': {
                x: 0, y: -1,
                startY: 0, endY: BOARD_HEIGHT, incrementY: 1,
                startX: 0, endX: BOARD_WIDTH, incrementX: 1
            },
            'down': {
                x: 0, y: 1,
                startY: BOARD_HEIGHT - 1, endY: -1, incrementY: -1,
                startX: 0, endX: BOARD_WIDTH, incrementX: 1
            },
            'left': {
                x: -1, y: 0,
                startY: 0, endY: BOARD_HEIGHT, incrementY: 1,
                startX: 0, endX: BOARD_WIDTH, incrementX: 1
            },
            'right': {
                x: 1, y: 0,
                startY: 0, endY: BOARD_HEIGHT, incrementY: 1,
                startX: BOARD_WIDTH - 1, endX: -1, incrementX: -1
            }
        }
        const dir = directions[direction]
        if(!dir) {
            throw new Error('Invalid direction')
        }
        let moved = false
        for(let y = dir.startY; y !== dir.endY; y += dir.incrementY) {
            for(let x = dir.startX; x !== dir.endX; x += dir.incrementX) {
                if(this.board[y][x]) {
                    let newLocationX = x
                    let newLocationY = y
                    while(newLocationX + dir.x >= 0 && newLocationX + dir.x < BOARD_WIDTH &&
                        newLocationY + dir.y >= 0 && newLocationY + dir.y < BOARD_HEIGHT &&
                        !this.board[newLocationY + dir.y][newLocationX + dir.x]) {
                        newLocationX += dir.x
                        newLocationY += dir.y
                    }
                    if(newLocationX !== x || newLocationY !== y) {
                        this.board[newLocationY][newLocationX] = this.board[y][x]
                        this.board[y][x] = 0
                        this.board[newLocationY][newLocationX].x = newLocationX
                        this.board[newLocationY][newLocationX].y = newLocationY
                        moved = true
                    }
                }
            }
        }
        return moved
    }

    update() {
        if(this.game.keys['w']) {
            this.game.keys['w'] = false
            this.shift('up')
        } else if(this.game.keys['s']) {
            this.game.keys['s'] = false
            this.shift('down')
        } else if(this.game.keys['a']) {
            this.game.keys['a'] = false
            this.shift('left')
        } else if(this.game.keys['d']) {
            this.game.keys['d'] = false
            this.shift('right')
        }
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