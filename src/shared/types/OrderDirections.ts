export enum Direction {
  Ascending = "ASC",
  Descending = "DESC",
}

class OrderDirection {
  constructor() {}
  static parse = (value: string): "ASC" | "DESC" => {
    switch (value.toLowerCase()) {
      case "asc":
        return "ASC";
      case "desc":
        return "DESC";
    }
  };
}

export { OrderDirection };
