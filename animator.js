class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, loop) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, loop});

        this.elapsedTime = 0
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y, scale, flipped=false) {
        this.elapsedTime += tick
        const frame = this.currentFrame();

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }
        ctx.save()
        if(flipped) {
            x = -x - this.width
            ctx.scale(-1, 1)
        }
        
        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding),
            this.yStart,
            this.width, this.height,
            x, y,
            this.width * scale, this.height * scale
        );
        ctx.restore()
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration)
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}