import { Profile } from './profile.model';

export interface Tags {
  tags: string[];
  body: string;
  createdAt: string;
  author: Profile;
}
