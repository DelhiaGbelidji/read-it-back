import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, user_id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found.`);
    }

    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        user_id: user_id,
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
      include: {
        user: true,
        manuscript: true,
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

    await this.prisma.manuscript.deleteMany({ where: { project_id: id } });
    await this.prisma.project.delete({
      where: { id: id },
    });

    return { message: 'Project successfully deleted' };
  }
}
