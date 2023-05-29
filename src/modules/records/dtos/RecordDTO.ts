interface RecordDTO {
  id: string;
  operationType: string;
  operationResult: string | number;
  createdAt: Date;
  isDeleted: boolean;
}
