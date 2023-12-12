import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PiaIntakeModule } from '../pia-intake/pia-intake.module';
import { ReplyEntity } from './entities/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, ReplyEntity]),
    PiaIntakeModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
