import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import ICity from '../interfaces/ICity';
import ICommunication from '../interfaces/ICommunication';
import ICommunicationMember from '../interfaces/ICommunicationMember';
import IFamily from '../interfaces/IFamily';
import IFamilyMember from '../interfaces/IFamilyMember';
import IFamilyMemberEvent from '../interfaces/IFamilyMemberEvent';
import ILinkedDocument from '../interfaces/ILinkedDocument';
import IPaymentMethod from '../interfaces/IPaymentMethod';
import IPaymentRecord from '../interfaces/IPaymentRecord';
import IRecipient from '../interfaces/IRecipient';
import IUserInfos from '../interfaces/IUserInfos';

const userLog = JSON.parse(
  localStorage.getItem('userInfos') || '{"id":0,"name":""}',
) as unknown as IUserInfos;

type UserContent = {
  user: IUserInfos;
  setUser: React.Dispatch<React.SetStateAction<IUserInfos>>;
  logout: () => void;
  family: IFamily[];
  setFamily: React.Dispatch<React.SetStateAction<IFamily[]>>;
  city: ICity[];
  setCity: React.Dispatch<React.SetStateAction<ICity[]>>;
  recipient: IRecipient[];
  setRecipient: React.Dispatch<React.SetStateAction<IRecipient[]>>;
  familyMembers: IFamilyMember[];
  setFamilyMembers: React.Dispatch<React.SetStateAction<IFamilyMember[]>>;
  paymentRecordsByFamily: IPaymentRecord[];
  setPaymentRecordsByFamily: React.Dispatch<React.SetStateAction<IPaymentRecord[]>>;
  paymentMethods: IPaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<IPaymentMethod[]>>;
  communicationMembersByFamily: ICommunicationMember[];
  setCommunicationMembersByFamily: React.Dispatch<
    React.SetStateAction<ICommunicationMember[]>
  >;
  communications: ICommunication[];
  setCommunications: React.Dispatch<React.SetStateAction<ICommunication[]>>;
  linkedDocumentsByFamily: ILinkedDocument[];
  setLinkedDocumentsByFamily: React.Dispatch<React.SetStateAction<ILinkedDocument[]>>;
  familyMemberEvents: IFamilyMemberEvent[];
  setFamilyMemberEvents: React.Dispatch<React.SetStateAction<IFamilyMemberEvent[]>>;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  user: userLog,
  setUser: () => {},
  logout: () => {},
  family: [],
  setFamily: () => {},
  city: [],
  setCity: () => {},
  recipient: [],
  setRecipient: () => {},
  familyMembers: [],
  setFamilyMembers: () => {},
  paymentRecordsByFamily: [],
  setPaymentRecordsByFamily: () => {},
  paymentMethods: [],
  setPaymentMethods: () => {},
  communicationMembersByFamily: [],
  setCommunicationMembersByFamily: () => {},
  communications: [],
  setCommunications: () => {},
  linkedDocumentsByFamily: [],
  setLinkedDocumentsByFamily: () => {},
  familyMemberEvents: [],
  setFamilyMemberEvents: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUserInfos>(userLog);
  const [family, setFamily] = useState<IFamily[]>([]);
  const [city, setCity] = useState<ICity[]>([]);
  const [recipient, setRecipient] = useState<IRecipient[]>([]);
  const [familyMembers, setFamilyMembers] = useState<IFamilyMember[]>([]);
  const [paymentRecordsByFamily, setPaymentRecordsByFamily] = useState<IPaymentRecord[]>(
    [],
  );
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const [communicationMembersByFamily, setCommunicationMembersByFamily] = useState<
    ICommunicationMember[]
  >([]);
  const [communications, setCommunications] = useState<ICommunication[]>([]);
  const [linkedDocumentsByFamily, setLinkedDocumentsByFamily] = useState<
    ILinkedDocument[]
  >([]);
  const [familyMemberEvents, setFamilyMemberEvents] = useState<IFamilyMemberEvent[]>([]);

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
        family,
        setFamily,
        city,
        setCity,
        recipient,
        setRecipient,
        familyMembers,
        setFamilyMembers,
        paymentRecordsByFamily,
        setPaymentRecordsByFamily,
        paymentMethods,
        setPaymentMethods,
        communicationMembersByFamily,
        setCommunicationMembersByFamily,
        communications,
        setCommunications,
        linkedDocumentsByFamily,
        setLinkedDocumentsByFamily,
        familyMemberEvents,
        setFamilyMemberEvents,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
