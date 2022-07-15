export default interface IPaymentRecord {
  id: number;
  idPaymentMethod: number;
  checkNumber?: number;
  isPaymentActivity: number;
  dateStart: string;
  dateEnd: string;
  amount: number;
  idFamily?: number;
  idFamilyMember?: number;
  idActivity?: number;
}
