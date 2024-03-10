import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId: userId,
      },
    });
    return project;
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { name, image } = updateProjectDto;

    const project = await this.prisma.project.findUnique({ where: { id: id } });
    if (!project) throw new NotFoundException('Project not found');

    return await this.prisma.project.update({
      where: { id: id },
      data: {
        name,
        image,
      },
    });
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (!project) throw new NotFoundException('Project not found');

    await this.prisma.project.delete({
      where: { id: id },
    });

    return { message: 'User successfully deleted' };
  }
}
