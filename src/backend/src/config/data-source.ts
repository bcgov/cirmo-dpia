import { configService } from './config.service';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  ...configService.getTypeOrmConfig(),
});
