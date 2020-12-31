import { Profile } from './profile';

export interface Article {
  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: Array<string>;
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  author?: Profile;
}
