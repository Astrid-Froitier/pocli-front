export default interface IEvent {
  id: number;
  numberParticipantsMax?: number;
  date: string;
  description: string;
  text?: string;
  podcastLink?: string;
  reservedAdherent: number;
  price?: number;
  idPostType: number;
  idActivity?: number;
}
