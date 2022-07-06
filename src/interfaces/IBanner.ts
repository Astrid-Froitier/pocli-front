export default interface IBanner {
  nameBannerActivity?: string;
  title: string;
  nameIcon?: string;
  bannerAbout?: boolean;
  bannerEvent?: boolean;
  bannerMember?: boolean;
  memberFilter?: boolean;
  event?: {
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
  };
}
