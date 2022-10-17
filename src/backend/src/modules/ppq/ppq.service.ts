import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PpqPostDTO } from './dto/ppq-post.dto';
import { PpqEntity } from './entities/ppq.entity';

@Injectable()
export class PpqService {
  constructor(
    @InjectRepository(PpqEntity) private ppqRepository: Repository<PpqEntity>,
  ) {}

  async createPpq(body: PpqPostDTO) {
    await this.ppqRepository.save({ ...body });
  }
}
