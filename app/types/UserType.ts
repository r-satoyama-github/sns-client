import { PostType } from "./PostType";

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
}
