import { User } from '@auth0/auth0-react';
import { FC } from 'react';

interface UserInfoProps {
  user: User;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return <div>Hello {user.nickname ?? user.email}</div>;
};

export default UserInfo;
