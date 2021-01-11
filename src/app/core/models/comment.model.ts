import { Profile } from './profile.model';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}

export interface Comments {
  comments: Comment[];
}
