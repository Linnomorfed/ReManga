import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTranslatorDto } from './dto/create-translator.dto';
import { UpdateTranslatorDto } from './dto/update-translator.dto';
import { TranslatorEntity } from './entities/translator.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { FilesService } from 'src/files/files.service';
import { MembersService } from 'src/members/members.service';
import { MemberRoles } from 'src/members/enums/roles.enum';
import { MemberPermissions } from 'src/members/enums/permisions.enum';

@Injectable()
export class TranslatorsService {
  constructor(
    @InjectRepository(TranslatorEntity)
    private repository: Repository<TranslatorEntity>,
    private userService: UserService,
    private filesService: FilesService,
    private memberService: MembersService,
  ) {}
  async create(dto: CreateTranslatorDto, userId: number) {
    const user = await this.userService.findById(userId);

    const result = await this.repository.save({
      title: dto.title,
      tagline: dto.tagline,
      leader: user,
    });

    this.memberService.addNewMemberToTeam(
      {
        userId: +userId,
        teamId: +result.id,
        role: MemberRoles.commander,
        permission: MemberPermissions.creator,
      },
      userId,
    );

    return result;
  }

  async updateTeamImg(id: number, imageBuffer: Buffer) {
    const image = await this.filesService.uploadMangaImg(imageBuffer);
    this.repository.update(+id, { picture: image.url });
  }

  findAll() {
    return `This action returns all translators`;
  }

  findOne(id: number) {
    return this.repository.findOne(+id);
  }

  update(id: number, dto: UpdateTranslatorDto) {
    return `This action updates a #${id} translator`;
  }

  remove(id: number) {
    return `This action removes a #${id} translator`;
  }
}
