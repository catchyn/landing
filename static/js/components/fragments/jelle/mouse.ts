export class Mouse {
  public x: number;
  public y: number;

  constructor(canvas: any, container: string) {
    this.x = 0;
    this.y = 0;
    var rect = canvas.getBoundingClientRect();
    canvas.onmousemove = (e: any) => {
      
      this.x = e.clientX - rect.left;
      this.y = e.clientY + window.scrollY + 30 - rect.top;
    };
  }
}
