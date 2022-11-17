import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class ConfigurationService {
  getFeatures() {
    try {
      const filePath = process.env.CONFIG_FILE_PATH;
      const configContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(configContents);
    } catch (error) {
      console.log(`Read Feature Flag File ERROR: ${error}`);
      throw new InternalServerErrorException('Something went wrong parsing the config')
    }
  }
}
