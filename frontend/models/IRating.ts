export interface RatingDto {
  mangaId: number;
  rate: number;
}
export interface RatingResponse {
  createdAt: string;
  id: number;
  mangaId: number;
  rate: number;
  userId: number;
}
