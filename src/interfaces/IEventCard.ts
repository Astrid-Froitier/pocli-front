export default interface IEventCard {
  event: {
    id: number,
    numberParticipantsMax?: number,
    date: string,
    description: string,
    text?: string,
    podcastLink?: string,
    reservedAdherent: boolean,
    price?: number,
    idPostType: number,
    idActivity: number,
  },
  bannerEvent?: boolean,
}
