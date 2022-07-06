export default interface IEvent {
  id: number;
  numberParticipantsMax?: number;
  date: string;
  description: string;
  text?: string;
  podcastLink?: string;
  reservedAdherent: number;
  price?: number;
  postType_name: string;
  activity_name?: string;
  activity_category?: string;
  activity_abridged?: string;
}
