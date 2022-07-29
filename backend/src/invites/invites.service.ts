import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslatorsService } from 'src/translators/translators.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { InviteEntity } from './entities/invite.entity';

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(InviteEntity)
    private repository: Repository<InviteEntity>,
    private translatorsService: TranslatorsService,
    private userService: UserService,
  ) {}
  async createInviteToTeam(dto: CreateInviteDto, userId: number) {
    const team = await this.translatorsService.findOne(+dto.teamId);
    const user = await this.userService.findById(+userId);

    const content = await this.repository.save({ user, translatorsTeam: team });
    return content;
  }

  async findAllInvitesByTeamId(teamId: number, userId: number) {
    const team = await this.translatorsService.findOne(+teamId);

    if (team.leaderId === userId) {
      const result = await this.repository.find({ translatorsTeamId: teamId });
      return result;
    } else {
      throw new ForbiddenException("You don't have permissions");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} invite`;
  }

  update(id: number, updateInviteDto: UpdateInviteDto) {
    return `This action updates a #${id} invite`;
  }

  remove(id: number) {
    return `This action removes a #${id} invite`;
  }
}
