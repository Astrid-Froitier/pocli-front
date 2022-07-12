import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserContent = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  id: 0,
  setId: () => {},
  name: '',
  setName: () => {},
  logout: () => {},
  admin: false,
  setAdmin: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const removeCookie = useCookies(['user_token'])[2];

  const logout = (): void => {
    setId(0);
    setName('');
    setAdmin(false);
    removeCookie('user_token');
  };

  return (
    <CurrentUserContext.Provider
      value={{
        id,
        setId,
        name,
        setName,
        logout,
        admin,
        setAdmin,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
