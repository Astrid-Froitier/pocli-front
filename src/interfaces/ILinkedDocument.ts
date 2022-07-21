export default interface ILinkedDocument {
  id: number;
  idDocument: number;
  date: string;
  idActivity?: number;
  idEvent?: number;
  idCommunication?: number;
  idFamilyMember?: number;
  idFamily?: number;
  isOpened: number;
}
