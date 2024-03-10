import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/types';

@Controller('comments')
@UseGuards(JwtGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const userId = Number(user.id);

    if (!userId) {
      throw new UnauthorizedException(
        'User ID is missing in the token payload',
      );
    }

    return await this.commentsService.create(createCommentDto, userId);
  }

  @Get()
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const result = await this.commentsService.update(id, updateCommentDto);
    return { message: 'Comment updated successfully', result };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.remove(id);
  }
}
