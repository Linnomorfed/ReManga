import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingEntity } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private repository: Repository<RatingEntity>,
  ) {}
  async create(dto: CreateRatingDto, user: UserEntity, manga: MangaEntity) {
    const mangaId = manga.id;

    const data = await this.repository.save({
      manga: manga,
      rate: dto.rate,
      user: user,
    });

    const qb = await this.repository.createQueryBuilder('r');

    const { avg } = await qb
      .where('r.mangaId = :mangaId', { mangaId: mangaId })
      .select('CAST(AVG(r.rate) AS DECIMAL(10,1))', 'avg')
      .getRawOne();

    getRepository(MangaEntity)
      .createQueryBuilder('manga')
      .whereInIds(mangaId)
      .update()
      .set({ votes_count: () => 'votes_count +1' })
      .execute();
    const start = new Date();

    getRepository(MangaEntity)
      .createQueryBuilder('manga')
      .whereInIds(mangaId)
      .update()
      .set({ rating: +avg })
      .execute();

    return data;
  }
  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  async update(id: number, dto: UpdateRatingDto) {
    const mangaId = dto.mangaId;

    const data = await this.repository.update(+id, { rate: dto.rate });

    const qb = await this.repository.createQueryBuilder('r');

    const { avg } = await qb
      .where('r.mangaId = :mangaId', { mangaId: mangaId })
      .select('CAST(AVG(r.rate) AS DECIMAL(10,1))', 'avg')
      .getRawOne();

    getRepository(MangaEntity)
      .createQueryBuilder('manga')
      .whereInIds(mangaId)
      .update()
      .set({ rating: +avg })
      .execute();

    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
