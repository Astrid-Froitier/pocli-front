import React, { createContext, useState } from 'react';

import IActivity from '../interfaces/IActivity';
import IDocument from '../interfaces/IDocument';
import IEvent from '../interfaces/IEvent';
import ILinkedDocument from '../interfaces/ILinkedDocument';
import IPostType from '../interfaces/IPostType';

type DataContent = {
  events: IEvent[];
  postTypes: IPostType[];
  activities: IActivity[];
  documents: IDocument[];
  linkedDocuments: ILinkedDocument[];
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
  setPostTypes: React.Dispatch<React.SetStateAction<IPostType[]>>;
  setActivities: React.Dispatch<React.SetStateAction<IActivity[]>>;
  setDocuments: React.Dispatch<React.SetStateAction<IDocument[]>>;
  setLinkedDocuments: React.Dispatch<React.SetStateAction<ILinkedDocument[]>>;
};

type CurrentModalProps = { children: React.ReactNode };

const CurrentDataContext = createContext<DataContent>({
  events: [],
  postTypes: [],
  activities: [],
  documents: [],
  linkedDocuments: [],
  setEvents: () => {},
  setPostTypes: () => {},
  setActivities: () => {},
  setDocuments: () => {},
  setLinkedDocuments: () => {},
});

export const CurrentDataContextProvider = ({ children }: CurrentModalProps) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [postTypes, setPostTypes] = useState<IPostType[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [linkedDocuments, setLinkedDocuments] = useState<ILinkedDocument[]>([]);

  return (
    <CurrentDataContext.Provider
      value={{
        events,
        postTypes,
        activities,
        documents,
        linkedDocuments,
        setEvents,
        setPostTypes,
        setActivities,
        setDocuments,
        setLinkedDocuments,
      }}>
      {children}
    </CurrentDataContext.Provider>
  );
};

export default CurrentDataContext;
