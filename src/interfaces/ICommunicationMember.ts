export default interface ICommunicationMember {
  id: number;
  idFamilyMember?: number;
  idFamily?: number;
  idActivity?: number;
  idCommunication: number;
  isOpened: number;
  isTrashed: number;
}
