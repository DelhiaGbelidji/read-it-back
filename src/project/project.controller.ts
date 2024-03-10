import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/types';
// import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
@UseGuards(JwtGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  async create(
    @Body() createProjectDto: CreateProjectDto,
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

    return await this.projectService.createProject(createProjectDto, userId);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectService.update(+id, updateProjectDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
