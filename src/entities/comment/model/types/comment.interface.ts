import { IUser } from '@/entities/user';

export interface IComment {
  id: string;
  user: IUser;
  text: string;
}

export interface ICommentTest {
  id: string;
  text: string;
  templateId: string;
  userId: string;
}
