import "reflect-metadata";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("records")
class Record {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Operation)
  @JoinColumn({ name: "operation_id" })
  operation: Operation;

  @Column({ name: "operation_id" })
  operationId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "operation_response" })
  operationResponse: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Record };
