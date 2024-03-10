import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const manuscriptExists = await this.prisma.manuscript.findUnique({
      where: { id: createCommentDto.manuscriptId },
    });
    if (!manuscriptExists) {
      throw new NotFoundException(
        `Manuscript with ID ${createCommentDto.manuscriptId} not found.`,
      );
    }

    const comment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        userId,
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
