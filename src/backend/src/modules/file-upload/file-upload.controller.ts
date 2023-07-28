import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IRequest } from 'src/common/interfaces/request.interface';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('file')
@ApiTags('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Get('upload')
  @Unprotected()
  async upload(@Req() req: IRequest, @Res() res: IResponse) {
    const fileName = req.query?.fileName?.toString();
    const fileType = req.query?.fileType?.toString();
    const contentLength = +req.query?.contentLength;

    console.log(process.env.S3_BUCKET);
    const s3Params: PutObjectCommandInput = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      ContentType: fileType,
      ContentLength: contentLength, //new Blob([data]).size // file.size
      // ACL: 'bucket-owner-full-control'
    };

    const client = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: 'aws',
    });
    const command = new PutObjectCommand(s3Params);

    try {
      const signedUrl = await getSignedUrl(client, command, { expiresIn: 60 });
      console.log(signedUrl);
      res.json({ signedUrl });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        message: err?.message || 'It failed!',
      });
    }
  }

  @Post()
  create(@Body() createFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.create(createFileUploadDto);
  }

  @Get()
  @Unprotected()
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploadDto: UpdateFileUploadDto,
  ) {
    return this.fileUploadService.update(+id, updateFileUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadService.remove(+id);
  }
}
