import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('/')
export class PageController {
  @Get()
  findAll() {}
}
