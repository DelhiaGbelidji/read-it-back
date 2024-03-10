import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ManuscriptsService } from './manuscripts.service';
import { CreateManuscriptDto } from './dto/create-manuscript.dto';
// import { UpdateManuscriptDto } from './dto/update-manuscript.dto';
import { RequestWithUser } from 'src/types';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('manuscripts')
@UseGuards(JwtGuard)
export class ManuscriptsController {
  constructor(private readonly manuscriptsService: ManuscriptsService) {}

  @Post()
  async create(
    @Body() createManuscriptDto: CreateManuscriptDto,
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

    return await this.manuscriptsService.create(createManuscriptDto, userId);
  }

  @Get()
  async findAll() {
    return await this.manuscriptsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.manuscriptsService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateManuscriptDto: UpdateManuscriptDto,
  // ) {
  //   return this.manuscriptsService.update(+id, updateManuscriptDto);
  // }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.manuscriptsService.remove(id);
  }
}
