import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManuscriptDto } from './dto/create-manuscript.dto';
import { UpdateManuscriptDto } from './dto/update-manuscript.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ManuscriptsService {
  constructor(private prisma: PrismaService) {}

  async create(createManuscriptDto: CreateManuscriptDto, user_id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${user_id} not found.`);
    }

    const projectExists = await this.prisma.project.findUnique({
      where: { id: createManuscriptDto.project_id },
    });
    if (!projectExists) {
      throw new NotFoundException(
        `Project with ID ${createManuscriptDto.project_id} not found.`,
      );
    }
    const manuscript = await this.prisma.manuscript.create({
      data: {
        ...createManuscriptDto,
        user_id,
      },
    });
    return manuscript;
  }

  async findAll() {
    return await this.prisma.manuscript.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.manuscript.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateManuscriptDto: UpdateManuscriptDto) {
    const { title, file_url } = updateManuscriptDto;

    const manuscript = await this.prisma.manuscript.findUnique({
      where: { id: id },
    });
    if (!manuscript) throw new NotFoundException('Manuscript  not found');

    return await this.prisma.manuscript.update({
      where: { id: id },
      data: { title, file_url },
    });
  }

  async remove(id: number) {
    const manuscript = await this.findOne(id);
    if (!manuscript) throw new NotFoundException('Manuscript not found');

    await this.prisma.comment.deleteMany({ where: { manuscript_id: id } });
    await this.prisma.manuscript.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Manuscript successfully deleted' };
  }
}
