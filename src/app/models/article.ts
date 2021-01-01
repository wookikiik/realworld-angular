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

export class ArticleListConfig {
  type = 'all';
  filters: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  } = {};
}
