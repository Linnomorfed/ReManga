export interface RatingDto {
  mangaId: number;
  rate: number;
}
export interface RatingResponse extends RatingDto {
  createdAt: string;
  id: number;
  userId: number;
}
