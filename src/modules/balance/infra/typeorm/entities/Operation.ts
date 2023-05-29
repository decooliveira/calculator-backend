import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("operations")
class Operation {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  cost: number;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Operation };
