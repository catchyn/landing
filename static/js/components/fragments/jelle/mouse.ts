export class Mouse {
  public x: number;
  public y: number;

  constructor(canvas: any, container: string) {
    this.x = 0;
    this.y = 0;
    var rect = canvas.getBoundingClientRect();

    canvas.onmousemove = (e: any) => {
      console.log("e", e);
      this.x = e.clientX - rect.left;
      this.y = e.clientY + 30 - rect.top;
    };
  }

  private _getCanvasPos(el: string) {
    console.log("posssssoss", el);
    var canvas = document.getElementById(el) as HTMLElement;
    console.log("container", canvas);
    var _x = canvas.scrollLeft;
    var _y = canvas.scrollTop;

    return {
      left: _x,
      top: _y
    };
  }
}
