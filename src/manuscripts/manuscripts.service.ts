import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManuscriptDto } from './dto/create-manuscript.dto';
// import { UpdateManuscriptDto } from './dto/update-manuscript.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ManuscriptsService {
  constructor(private prisma: PrismaService) {}

  async create(createManuscriptDto: CreateManuscriptDto, userId: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const projectExists = await this.prisma.project.findUnique({
      where: { id: createManuscriptDto.projectId },
    });
    if (!projectExists) {
      throw new NotFoundException(
        `Project with ID ${createManuscriptDto.projectId} not found.`,
      );
    }
    const manuscript = await this.prisma.manuscript.create({
      data: {
        ...createManuscriptDto,
        userId,
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

  // async update(id: number, updateManuscriptDto: UpdateManuscriptDto) {
  //   return `This action updates a #${id} manuscript`;
  // }

  async remove(id: number) {
    const manuscript = await this.findOne(id);
    if (!manuscript) throw new NotFoundException('Manuscript not found');

    await this.prisma.manuscript.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Manuscript successfully deleted' };
  }
}
