import * as React from "React";
import { bind } from "decko";

// Нужно подумать над реализацией

interface CursorFunnyProps {
  top: string;
  left: string;
  height: string;

  right?: string;
  bottom?: string;
  width?: string;
}

interface CursorFunnyState {
  enable: boolean;
  cTop?: number;
  cLeft?: number;
}

export class CursorFunny extends React.Component<
  CursorFunnyProps,
  CursorFunnyState
> {
  private _zone: React.RefObject<HTMLDivElement>;
  private _circle: React.RefObject<HTMLDivElement>;

  constructor(props: CursorFunnyProps) {
    super(props);
    this._zone = React.createRef();
    this._circle = React.createRef();

    this.state = {
      enable: false
    };
  }

  componentDidMount() {
    this._zone.current.addEventListener("mouseover", this._onMouseOver);
    this._zone.current.addEventListener("mouseout", this._onMouseOut);
    this._zone.current.addEventListener("mousemove", this._onMouseMove);
  }

  componentDidUpdate() {
    this._circle.current &&
      this._circle.current.addEventListener("mousemove", this._onMouseMove);
  }

  componentWillUnmount() {
    this._zone.current.removeEventListener("mouseover", this._onMouseOver);
    this._zone.current.removeEventListener("mouseout", this._onMouseOut);
    this._zone.current.removeEventListener("mousemove", this._onMouseMove);
    this._circle.current.removeEventListener("mousemove", this._onMouseMove);
  }

  render() {
    const { top, right, bottom, left, width, height } = this.props;
    const { enable, cTop, cLeft } = this.state;

    return (
      <>
        <div
          ref={this._zone}
          className="cursor-funny-zone"
          style={{ top, left, height }}
        />
        {enable && (
          <div
            ref={this._circle}
            className="cf-round"
            style={{ top: `${cTop}px`, left: `${cLeft}px` }}
          />
        )}
      </>
    );
  }

  @bind
  private _onMouseOver() {
    this.setState({ enable: true });
  }

  @bind
  private _onMouseOut(event: any) {
    event.target.classList.indexOf = [].indexOf;
    event.target.classList.indexOf("cf-round") !== -1 &&
      this.setState({ enable: false });
  }

  @bind
  private _onMouseMove(event: any) {
    requestAnimationFrame(() =>
      this.setState({ cTop: event.clientY - 50, cLeft: event.clientX - 50 })
    );
  }
}
