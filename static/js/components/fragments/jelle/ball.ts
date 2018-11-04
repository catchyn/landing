export class Ball {
    public x: number;
    public y: number;
    public originalX: number;
    protected originalY: number;
    protected vx: number;
    protected vy: number;
    protected radius: number;
    protected color: string;
    protected friction: number;
    protected springFactor: number;

	constructor(x: number, y:number, radius?: number, color?: string) {
		this.x = x || 0;
		this.y = y || 0;

        this.originalX = x || 0;
        this.originalY = y || 0;
        this.vx = 0;
        this.vy = 0;
		this.radius = radius || 1;
		this.color = color || "rgba(255, 255, 255, .3)";
        this.friction = 0.1;
        this.springFactor = 0.8;
	}
    setPos(x: number,y: number){
        this.x = x;
        this.y = y;
    }

    setOriginalX(x: number) {
        this.originalX = x;
    }

    think(mouse: {x:number, y:number}){
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;

        let  dist = Math.sqrt(dx*dx + dy*dy);
        // interaction
        if(dist<120){
            let angle = Math.atan2(dy,dx);
            let tx = mouse.x + Math.cos(angle) * 140;
            let ty = mouse.y + Math.sin(angle) * 140;

            this.vx += tx - this.x;
            this.vy += ty - this.y;
        }

        // spring back
        let dx1 = -(this.x - this.originalX);
        let dy1 = -(this.y - this.originalY);

        this.vx += dx1 * this.springFactor;
        this.vy += dy1 * this.springFactor;

        
        // friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // actual move
        this.x += this.vx;
        this.y += this.vy;
    }

	draw(ctx: any) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}
