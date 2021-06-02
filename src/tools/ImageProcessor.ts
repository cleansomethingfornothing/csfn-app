import { imageProcessor, resize, sharpen } from 'ts-image-processor'
import { base64ToBlob, blobToBase64 } from 'base64-blob'
import watermark from 'watermarkjs'

export function processActivityPicture(picture: Blob) {
  return blobToBase64(picture)
    .then((base64) => imageProcessor.src(base64)
      .pipe(resize({ maxWidth: 1024, maxHeight: 1365 }), sharpen()))
    .then((resized) => watermark([resized, require('@/assets/img/watermark.png')])
      .blob(watermark.image.lowerRight(1)))
}

export function resizePicture(picture: Blob,
                              width: number) {
  return blobToBase64(picture)
    .then((base64) => imageProcessor.src(base64)
      .pipe(resize({ maxWidth: width, maxHeight: Math.round(width * 4 / 3) }), sharpen()))
    .then(base64 => base64ToBlob(base64))
}
