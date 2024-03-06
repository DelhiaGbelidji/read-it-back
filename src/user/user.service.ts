/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) throw new ConflictException('email duplicated');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    const { password, ...result } = newUser;

    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findById(id);

    if (user && user.id !== id)
      throw new ConflictException('Email already in use');

    const updateData = { ...dto };

    if (dto.password) {
      updateData.password = await hash(dto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: updateData,
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  async delete(id: number) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.delete({
      where: { id: id },
    });

    return { message: 'User successfully deleted' };
  }
}
