import React, { createContext, useState } from 'react';

type ModalContent = {
  modalOnOff: string;
  setModalOnOff: React.Dispatch<React.SetStateAction<string>>;
};

type CurrentModalProps = { children: React.ReactNode };

const CurrentModalContext = createContext<ModalContent>({
  modalOnOff: '',
  setModalOnOff: () => {},
});

export const CurrentModalContextProvider = ({ children }: CurrentModalProps) => {
  const [modalOnOff, setModalOnOff] = useState<string>('');

  return (
    <CurrentModalContext.Provider
      value={{
        modalOnOff,
        setModalOnOff,
      }}>
      {children}
    </CurrentModalContext.Provider>
  );
};

export default CurrentModalContext;
