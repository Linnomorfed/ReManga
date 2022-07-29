import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslatorEntity } from 'src/translators/entities/translator.entity';
import { UserService } from 'src/user/user.service';
import { getRepository, Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberEntity } from './entities/member.entity';
import { MemberPermissions } from './enums/permisions.enum';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MemberEntity)
    private repository: Repository<MemberEntity>,
    private userService: UserService,
  ) {}

  async addNewMemberToTeam(dto: CreateMemberDto, currentUserId: number) {
    const team = await getRepository(TranslatorEntity)
      .createQueryBuilder('t')
      .where('t.id = :teamId ', { teamId: dto.teamId })
      .getOne();
    const user = await this.userService.findById(+dto.userId);

    const res = await this.repository.findOne(+currentUserId);

    if (
      team.leaderId === currentUserId ||
      res.permission === MemberPermissions.creator
    ) {
      return this.repository.save({
        user: user,
        translatorsTeam: team,
        permission: dto.permission,
        role: dto.role,
      });
    } else {
      throw new ForbiddenException("You don't have permissions");
    }
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
