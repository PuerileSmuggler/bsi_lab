export interface DataChangeDTO {
    id: number;
  userId: number;
  passwordId: number;
  fields: Array<string>;
  previousValues: Array<string>;
  currentValues: Array<string>;
  actionType: string;
  createdAt: Date;
  updatedAt: Date;
}