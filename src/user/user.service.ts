/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const { firstname, lastname, email } = updateUserDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        email,
      },
    });
  }

  async changePassword(
    user_id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await compare(
      changePasswordDto.old_password,
      user.password,
    );
    if (!isMatch)
      throw new BadRequestException('Current password is incorrect');

    const hashedNewPassword = await hash(changePasswordDto.new_password, 10);
    await this.prisma.user.update({
      where: { id: user_id },
      data: { password: hashedNewPassword },
    });
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.comment.deleteMany({ where: { user_id: id } });
    await this.prisma.manuscript.deleteMany({ where: { user_id: id } });
    await this.prisma.project.deleteMany({ where: { user_id: id } });

    await this.prisma.user.delete({
      where: { id: id },
    });

    return { message: 'User successfully deleted' };
  }
}
