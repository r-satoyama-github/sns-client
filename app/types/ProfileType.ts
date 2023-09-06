import { UserType } from "./UserType";

export interface ProfileType {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
}
