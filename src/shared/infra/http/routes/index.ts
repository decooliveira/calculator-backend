import { Router } from "express";
import { mathOperationsRoutes } from "./math.operations.routes";
import { stringOperationsRoutes } from "./string.operation.routes";
import { recordsRoutes } from "./records.routes";
import { balancesRoutes } from "./balances.routes";
import { authenticateRoutes } from "./authentication.routes";
import { usersRoutes } from "./user.routes";

const router = Router();

router.use("/api/v1/math-operations", mathOperationsRoutes);
router.use("/api/v1/string-operations", stringOperationsRoutes);

router.use("/api/v1/records", recordsRoutes);
router.use("/api/v1/balances", balancesRoutes);
router.use("/api/v1/auth", authenticateRoutes);
router.use("/api/v1/users", usersRoutes);

export { router };
