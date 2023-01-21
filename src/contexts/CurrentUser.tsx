import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { getAllDataWithCredential } from '../../helpers/axios';
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

type UserContent = {
  user: IUserInfos;
  setUser: React.Dispatch<React.SetStateAction<IUserInfos>>;
  logout: () => void;
  family: IFamily;
  setFamily: React.Dispatch<React.SetStateAction<IFamily>>;
  cities: ICity[];
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>;
  recipients: IRecipient[];
  setRecipients: React.Dispatch<React.SetStateAction<IRecipient[]>>;
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
  cardSelected: boolean[];
  setCardSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  selectedMembers: IFamilyMember[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<IFamilyMember[]>>;
  stayConnected: boolean;
  setStayConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  user: { id: 0, name: '' },
  setUser: () => {},
  logout: () => {},
  family: {
    id: 0,
    name: '',
    streetNumber: 0,
    address: '',
    phoneNumber: 0,
    email: '',
    password: '',
    idCity: 0,
    idRecipient: 0,
  },
  setFamily: () => {},
  cities: [],
  setCities: () => {},
  recipients: [],
  setRecipients: () => {},
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
  cardSelected: [],
  setCardSelected: () => {},
  selectedMembers: [],
  setSelectedMembers: () => {},
  stayConnected: false,
  setStayConnected: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUserInfos>({ id: 0, name: '' });
  const [family, setFamily] = useState<IFamily>({
    id: 0,
    name: '',
    streetNumber: 0,
    address: '',
    phoneNumber: 0,
    email: '',
    password: '',
    idCity: 0,
    idRecipient: 0,
  });
  const [cities, setCities] = useState<ICity[]>([]);
  const [recipients, setRecipients] = useState<IRecipient[]>([]);
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
  const [cardSelected, setCardSelected] = useState<boolean[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<IFamilyMember[]>([]);
  const [stayConnected, setStayConnected] = useState<boolean>(false);

  useEffect(() => {
    localStorage.length > 0
      ? (setUser(JSON.parse(localStorage.getItem('userInfos') || '{"id":0,"name":""}')),
        setCardSelected(JSON.parse(localStorage.getItem('cardSelected') || '{}')))
      : sessionStorage.length > 0 &&
        (setUser(JSON.parse(sessionStorage.getItem('userInfos') || '{"id":0,"name":""}')),
        setCardSelected(JSON.parse(sessionStorage.getItem('cardSelected') || '{}')));
  }, [localStorage, sessionStorage]);

  useEffect(() => {
    user.id !== 0 &&
      familyMembers[0] === undefined &&
      getAllDataWithCredential([
        `https://pocli-bd.herokuapp.com/api/families/${user.id}/familyMembers`,
      ]).then((res) => {
        setFamilyMembers(res[0].data);
      });
  }, [familyMembers]);

  const removeCookie = useCookies(['user_token'])[2];

  const logout = (): void => {
    localStorage.clear();
    sessionStorage.clear();
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
        cities,
        setCities,
        recipients,
        setRecipients,
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
        cardSelected,
        setCardSelected,
        selectedMembers,
        setSelectedMembers,
        stayConnected,
        setStayConnected,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
