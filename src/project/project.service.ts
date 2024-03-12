import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    return project;
  }

  async findAll() {
    return await this.prisma.project.findMany({
      include: {
        user: true,
      },
    });
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
      include: {
        user: true,
      },
    });
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (!project) throw new NotFoundException('Project not found');

    await this.prisma.manuscript.deleteMany({ where: { projectId: id } });
    await this.prisma.project.delete({
      where: { id: id },
    });

    return { message: 'Project successfully deleted' };
  }
}
