import React, { createContext, useState } from 'react';

import IActivity from '../interfaces/IActivity';
import IDocument from '../interfaces/IDocument';
import IEvent from '../interfaces/IEvent';
import ILinkedDocument from '../interfaces/ILinkedDocument';
import IPartner from '../interfaces/IPartner';
import IPocliMember from '../interfaces/IPocliMember';
import IPostType from '../interfaces/IPostType';

type DataContent = {
  events: IEvent[];
  postTypes: IPostType[];
  activities: IActivity[];
  documents: IDocument[];
  linkedDocuments: ILinkedDocument[];
  pocliMembers: IPocliMember[];
  partners: IPartner[];
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
  setPostTypes: React.Dispatch<React.SetStateAction<IPostType[]>>;
  setActivities: React.Dispatch<React.SetStateAction<IActivity[]>>;
  setDocuments: React.Dispatch<React.SetStateAction<IDocument[]>>;
  setLinkedDocuments: React.Dispatch<React.SetStateAction<ILinkedDocument[]>>;
  setPocliMembers: React.Dispatch<React.SetStateAction<IPocliMember[]>>;
  setPartners: React.Dispatch<React.SetStateAction<IPartner[]>>;
};

type CurrentModalProps = { children: React.ReactNode };

const dateToday = new Date().toLocaleDateString();

const eventLoader = {
  id: 0,
  date: `${dateToday}`,
  description: 'Chargement en cours. Veuillez patienter...',
  reservedAdherent: 0,
  idPostType: 0,
  idActivity: 0,
};

const eventsLoader = [eventLoader, eventLoader, eventLoader, eventLoader, eventLoader];

const CurrentDataContext = createContext<DataContent>({
  events: [],
  postTypes: [],
  activities: [],
  documents: [],
  linkedDocuments: [],
  pocliMembers: [],
  partners: [],
  setEvents: () => {},
  setPostTypes: () => {},
  setActivities: () => {},
  setDocuments: () => {},
  setLinkedDocuments: () => {},
  setPocliMembers: () => {},
  setPartners: () => {},
});

export const CurrentDataContextProvider = ({ children }: CurrentModalProps) => {
  const [events, setEvents] = useState<IEvent[]>(eventsLoader);
  const [pocliMembers, setPocliMembers] = useState<IPocliMember[]>([]);
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [postTypes, setPostTypes] = useState<IPostType[]>([
    {
      id: 0,
      name: 'Activité',
    },
  ]);
  const [activities, setActivities] = useState<IActivity[]>([
    {
      id: 0,
      name: 'PoCLi',
      category: '',
      shortName: 'family',
    },
  ]);
  const [documents, setDocuments] = useState<IDocument[]>([
    {
      id: 0,
      name: 'pocli',
      url: 'assets/nopicture.png',
      idDocumentType: 1,
    },
  ]);
  const [linkedDocuments, setLinkedDocuments] = useState<ILinkedDocument[]>([
    {
      id: 0,
      idEvent: 0,
      idDocument: 0,
      date: '2022-07-20T20:55:29.000Z',
      isOpened: 0,
      isTrashed: 0,
    },
  ]);

  return (
    <CurrentDataContext.Provider
      value={{
        events,
        postTypes,
        activities,
        documents,
        linkedDocuments,
        pocliMembers,
        partners,
        setEvents,
        setPostTypes,
        setActivities,
        setDocuments,
        setLinkedDocuments,
        setPocliMembers,
        setPartners,
      }}>
      {children}
    </CurrentDataContext.Provider>
  );
};

export default CurrentDataContext;
