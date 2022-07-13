import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import IUserInfos from '../interfaces/IUserInfos';

const userLog = JSON.parse(
  localStorage.getItem('userInfos') || '{id:0,name:""}',
) as unknown as IUserInfos;

type UserContent = {
  user: IUserInfos;
  setUser: React.Dispatch<React.SetStateAction<IUserInfos>>;
  
  logout: () => void;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  user: userLog,
  setUser: () => {},
  logout: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<IUserInfos>(userLog);
  
  const removeCookie = useCookies(['user_token'])[2];

  const logout = (): void => {
    localStorage.clear();
    removeCookie('user_token');
    setUser({ id: 0, name: '' });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
