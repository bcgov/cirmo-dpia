import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class ConfigurationService {
  private filePath: string;

  private configContents: string;

  private configuration: JSON;

  constructor() {
    this.filePath = process.env.CONFIG_FILE_PATH;
    this.configContents = fs.readFileSync(this.filePath, 'utf8');
    this.configuration = JSON.parse(this.configContents);
  }

  getConfig() {
    return this.configuration;
  }
}
