import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class ConfigurationService {
  private filePath: string;

  private configContents: string;

  constructor() {
    this.filePath = process.env.CONFIG_FILE_PATH;
    this.configContents = fs.readFileSync(this.filePath, 'utf8');
  }

  getConfig() {
    try {
      return JSON.parse(this.configContents);
    } catch (error) {
      console.log(`Read Feature Flag File ERROR: ${error}`);
      throw new InternalServerErrorException(
        'Something went wrong parsing the config',
      );
    }
  }
}
