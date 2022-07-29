import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user: UserEntity, @Body() dto: CreateInviteDto) {
    return this.invitesService.createInviteToTeam(dto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findInvitesByQuery(
    @Query() query: CreateInviteDto,
    @User() user: UserEntity,
  ) {
    return this.invitesService.findAllInvitesByTeamId(+query.teamId, +user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInviteDto: UpdateInviteDto) {
    return this.invitesService.update(+id, updateInviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitesService.remove(+id);
  }
}
