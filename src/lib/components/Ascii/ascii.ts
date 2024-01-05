class Cell {
  constructor(private readonly x: number, private readonly y: number, private readonly color: string) {}

  draw(ctx: CanvasRenderingContext2D, symbol: string) {
    ctx.fillStyle = this.color;
    ctx.fillText(symbol, this.x, this.y);
  }
}

export class AsciiEffect {
  private readonly buffer: Uint8ClampedArray;
  private readonly imageCellArray: Cell[] = [];
  private readonly asciiTextLength: number;
  private cellSize: number;

  constructor(
    private readonly image: HTMLImageElement,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly width: number,
    private readonly height: number,
    cellSize: number,
    private readonly asciiText = '10'
  ) {
    this.ctx.drawImage(image, 0, 0, width, height);
    const imageData = this.ctx.getImageData(0, 0, width, height);
    this.buffer = new Uint8ClampedArray(imageData.data.buffer);
    this.cellSize = cellSize;
    this.scanImage(cellSize);
    this.asciiTextLength = this.asciiText.length;
  }

  private scanImage(cellSize: number) {
    this.imageCellArray.length = 0;

    for (let y = 0; y < this.height; y += cellSize) {
      for (let x = 0; x < this.width; x += cellSize) {
        const posX = x * 4;
        const posY = y * 4;
        const pos = posY * this.width + posX;
        const alpha = this.buffer[pos + 3];

        if (alpha > 128) {
          const [r, g, b] = this.buffer.slice(pos, pos + 3);
          const color = `rgb(${r},${g},${b})`;
          this.imageCellArray.push(new Cell(x, y, color));
        }
      }
    }
  }

  private getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * this.asciiTextLength);
    return this.asciiText.charAt(randomIndex);
  }

  private drawOriginal() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }

  private drawAscii() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const cell of this.imageCellArray) {
      cell.draw(this.ctx, this.getRandomSymbol());
    }
  }

  public resize(cellSize: number) {
    this.cellSize = cellSize;
    this.scanImage(cellSize);
  }

  public draw() {
    if (this.cellSize === 1) {
      this.drawOriginal();
    } else {
      this.drawAscii();
    }
  }
}
