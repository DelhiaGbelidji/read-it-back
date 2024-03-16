import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, user_id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${user_id} not found.`);
    }

    const manuscriptExists = await this.prisma.manuscript.findUnique({
      where: { id: createCommentDto.manuscript_id },
    });
    if (!manuscriptExists) {
      throw new NotFoundException(
        `Manuscript with ID ${createCommentDto.manuscript_id} not found.`,
      );
    }

    const comment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        user_id,
      },
    });
    return comment;
  }

  async findAll() {
    return await this.prisma.comment.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;

    const comment = await this.prisma.comment.findUnique({ where: { id: id } });
    if (!comment) throw new NotFoundException('Comment not found');

    return await this.prisma.comment.update({
      where: { id: id },
      data: { content },
    });
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    if (!comment) throw new NotFoundException('Comment not found');

    await this.prisma.comment.delete({
      where: { id: id },
    });

    return { message: 'Comment successfully deleted' };
  }
}
