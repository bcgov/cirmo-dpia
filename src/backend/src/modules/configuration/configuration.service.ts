import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class ConfigurationService {
  getFeatures() {
    try {
      // TODO need to check how to get the path of config file
      // hardcode in here or get from a env variables
      const filePath = process.env.FEATURE_FLAG_FILE_PATH;
      const fileName = process.env.FEATURE_FLAG_FILE_NAME;
      const text = fs.readFileSync(filePath + fileName, 'utf8');
      const jsonData = JSON.parse(text);

      return jsonData;
    } catch (error) {
      console.log(`Read Feature Flag File ERROR: ${error}`);
    }
  }
}
