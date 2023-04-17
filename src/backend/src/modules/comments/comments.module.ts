import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PiaIntakeModule } from '../pia-intake/pia-intake.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), PiaIntakeModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
