import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PinCommentDto } from './dto/pin-comment.dto';
import { SearchCommentDto } from './dto/search-comments.dto';
import { UpdateCertainCommentDto } from './dto/update-certain_comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user: UserEntity, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto, user);
  }

  @Patch('pin')
  @UseGuards(JwtAuthGuard)
  pinComment(@User() user: UserEntity, @Body() dto: PinCommentDto) {
    return this.commentsService.pinComment(dto, user);
  }

  @Patch('unpin/:id')
  @UseGuards(JwtAuthGuard)
  unpinComment(@User() user: UserEntity, @Param('id') id: string) {
    return this.commentsService.unpinComment(+id, user);
  }

  @Patch('rate/add/:id')
  @UseGuards(JwtAuthGuard)
  addCommentRate(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body() dto: UpdateCertainCommentDto,
  ) {
    return this.commentsService.addCommentRate(+id, dto, user);
  }

  @Patch('rate/update/:id')
  @UseGuards(JwtAuthGuard)
  updateCommentRate(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body() dto: UpdateCertainCommentDto,
  ) {
    return this.commentsService.updateCommentRate(+id, dto, user);
  }

  @Patch('rate/remove/:id')
  @UseGuards(JwtAuthGuard)
  removeCommentRate(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body() dto: UpdateCertainCommentDto,
  ) {
    return this.commentsService.removeCommentRate(+id, dto, user);
  }

  @Get()
  findAll(@Query() query: SearchCommentDto) {
    return this.commentsService.mangaFindAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
