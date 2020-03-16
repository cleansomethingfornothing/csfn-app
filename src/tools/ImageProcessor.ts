import {imageProcessor, resize, sharpen} from 'ts-image-processor'
import {blobToBase64} from 'base64-blob'
import watermark from 'watermarkjs'

export function processActivityPicture(picture: Blob) {
    return blobToBase64(picture)
        .then((base64) => imageProcessor.src(base64)
            .pipe(resize({maxWidth: 1024, maxHeight: 1740}), sharpen()))
        .then((resized) => watermark([resized, require('@/assets/img/watermark.png')])
            .blob(watermark.image.lowerRight(1)))
}
