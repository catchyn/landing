import { Mouse } from "./mouse";
import { Ball } from "./ball";
import React = require("react");
import { bind } from "decko";

interface JelleProps {
  width: number;
  extraClass?: string;
}

interface JelleState {}

export class Jelle extends React.Component<JelleProps, JelleState> {
  public canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _balls: Ball[];
  private _pos: Mouse;
  private _mouse: Ball;

  constructor(props: JelleProps) {
    super(props);

    this._balls = [];
  }

  componentDidMount() {
    this._generateBalls(this._getDotsCount(this.props.width));
    this.canvas = document.getElementById("drawOnMe") as HTMLCanvasElement;
    this._ctx = this.canvas.getContext("2d");
    this._pos = new Mouse(this.canvas, "scrollPage");
    // this._mouse = new Ball(0, 0, 60, "green");
    this._render();
  }

  componentDidUpdate(prevProps: JelleProps, prevState: JelleState) {
    if (prevProps.width !== this.props.width) {
      this._evenlyBalls(this._getDotsCount(this.props.width));
      this._correctBallsXPos(this.props.width, prevProps.width);
    }
  }

  private _correctBallsXPos(width: number, prevWidth: number) {
    this._balls.forEach(ball => {
      ball.setOriginalX((ball.originalX * width) / prevWidth);
    });
  }

  render() {
    const { extraClass, width } = this.props;
    return (
      <div className={`jelle ${extraClass}`}>
        <canvas id="drawOnMe" width={width} height="700" />
      </div>
    );
  }

  @bind
  private _getDotsCount(width: number) {
    return width * 1.4;
  }

  @bind
  private _generateBalls(num: number) {
    const { width } = this.props;
    for (var i = 0; i < num; i++) {
      var k = Math.random();
      this._balls.push(
        new Ball(
          Math.random() * width,
          k * k * 450,
          Math.ceil(Math.random() * 12) / 10
        )
      );
    }
  }

  @bind
  private _evenlyBalls(num: number) {
    if (this._balls && num > this._balls.length) {
      const numDots = num - this._balls.length;
      this._generateBalls(numDots);
    }

    if (this._balls && num < this._balls.length) {
      this._balls = this._balls.slice(0, num);
    }
  }

  private _connectDots(balls: Ball[]) {
    this._ctx.beginPath();
    this._ctx.moveTo(balls[0].x, balls[0].y);
    balls.forEach(ball => {
      this._ctx.lineTo(ball.x, ball.y);
    });

    this._ctx.closePath();
    this._ctx.fill();
  }

  private _connectDots1(dots: Ball[]) {
    this._ctx.beginPath();

    for (var i = 0, jlen = dots.length; i <= jlen; ++i) {
      var p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0];
      var p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1];
      this._ctx.quadraticCurveTo(
        p0.x,
        p0.y,
        (p0.x + p1.x) * 0.5,
        (p0.y + p1.y) * 0.5
      );
    }

    this._ctx.closePath();
    this._ctx.stroke();
  }

  @bind
  private _render() {
    window.requestAnimationFrame(this._render);
    this._ctx.clearRect(0, 0, this.props.width, 700);

    // this._mouse.setPos(this._pos.x, this._pos.y);
    // this._mouse.draw(this._ctx);

    this._balls.forEach(ball => {
      ball.think(this._pos);
      ball.draw(this._ctx);
    });
    // this._connectDots1(this._balls);
  }
}
