import { PostType } from "./PostType";
import { ProfileType } from "./ProfileType";

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: ProfileType;
}
