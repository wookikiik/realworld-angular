import { Profile } from './profile';

export interface Comment {
  id?: number;
  body?: string;
  createdAt?: string;
  author?: Profile;
}
