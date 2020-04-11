export default class Cropper {

  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  imageBlob: Blob

  image: HTMLImageElement

  static SIDE = 512

  public static crop(image: Blob): Promise<Blob> {
    return new Cropper(image).crop()
  }

  private constructor(image: Blob) {
    this.imageBlob = image
  }

  private crop(): Promise<Blob> {
    return this.initImage()
      .then(() => this.process())
  }

  private initImage(): Promise<void> {
    return new Promise<any>(resolve => {
      this.image = new Image()
      this.image.addEventListener('load', resolve)
      this.image.src = URL.createObjectURL(this.imageBlob)
    })
  }

  private process(): Promise<Blob> {
    const width = this.image.width
    const height = this.image.height

    if (this.isHorizontal(width, height)) {
      this.processHorizontalImage(width, height)
    } else {
      this.processVerticalImage(width, height)
    }

    return this.getResultBlob()
  }

  private isHorizontal(width, height): boolean {
    return width > height
  }

  private processHorizontalImage(width, height) {
    const size = height
    const offset = (width - height) / 2
    const finalSize = size > Cropper.SIDE ? Cropper.SIDE : size
    this.initCanvas(finalSize)
    this.context.drawImage(this.image, offset, 0, size, size, 0, 0, finalSize, finalSize)
  }

  private processVerticalImage(width, height) {
    const size = width
    const offset = (height - width) / 2
    const finalSize = size > Cropper.SIDE ? Cropper.SIDE : size
    this.initCanvas(finalSize)
    this.context.drawImage(this.image, 0, offset, size, size, 0, 0, finalSize, finalSize)
  }

  private initCanvas(size) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = size
    this.canvas.height = size
    this.context = this.canvas.getContext('2d')
  }

  private getResultBlob(): Promise<Blob> {
    return new Promise<Blob>(resolve => this.canvas.toBlob(resolve, 'image/jpeg', 1))
  }
}
