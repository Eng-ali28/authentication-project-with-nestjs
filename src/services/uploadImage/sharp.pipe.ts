import { Injectable, PipeTransform } from '@nestjs/common';
import { parse, join } from 'path';
import * as sharp from 'sharp';
@Injectable()
class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform(image: Express.Multer.File): Promise<string> {
    const orginalName = parse(image.originalname).name;
    let fileName = Date.now() + '-' + orginalName + '.webp';
    await sharp(image.buffer)
      .resize(250)
      .webp({ effort: 3 })
      .toFile(join('uploads', fileName));
    return fileName;
  }
}

export default SharpPipe;
