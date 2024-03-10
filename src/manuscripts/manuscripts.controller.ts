import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManuscriptsService } from './manuscripts.service';
import { CreateManuscriptDto } from './dto/create-manuscript.dto';
import { UpdateManuscriptDto } from './dto/update-manuscript.dto';

@Controller('manuscripts')
export class ManuscriptsController {
  constructor(private readonly manuscriptsService: ManuscriptsService) {}

  @Post()
  create(@Body() createManuscriptDto: CreateManuscriptDto) {
    return this.manuscriptsService.create(createManuscriptDto);
  }

  @Get()
  findAll() {
    return this.manuscriptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manuscriptsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManuscriptDto: UpdateManuscriptDto) {
    return this.manuscriptsService.update(+id, updateManuscriptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manuscriptsService.remove(+id);
  }
}
