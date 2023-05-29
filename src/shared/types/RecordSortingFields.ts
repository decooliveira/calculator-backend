enum RecordSortingFields {
  OPERATION = "operations.type",
  DATE = "records.createdAt",
  RESULT = "records.operationResponse",
}

class RecordFieldsParser {
  static parse = (value: string): string => {
    switch (value.toLowerCase()) {
      case "operation":
        return RecordSortingFields.OPERATION.toString();
      case "date":
        console.log(RecordSortingFields.OPERATION.toString());
        return RecordSortingFields.DATE.toString();
      case "result":
        return RecordSortingFields.RESULT.toString();
      default:
        return RecordSortingFields.DATE.toString();
    }
  };
}

export { RecordFieldsParser, RecordSortingFields };
