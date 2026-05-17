# Architecture Reference — Full Code Templates

## 1. DI Token (`src/constants/types.ts`)

```typescript
export const TYPES = {
  PrismaClient: Symbol.for("PrismaClient"),
  // Add per resource:
  DepartmentRepository: Symbol.for("DepartmentRepository"),
  DepartmentService: Symbol.for("DepartmentService"),
  DepartmentController: Symbol.for("DepartmentController"),
};
```

## 2. DTO (`src/dtos/department.dto.ts`)

```typescript
export interface CreateDepartmentDto {
  name: string;
  managerId?: number;
}

export interface UpdateDepartmentDto {
  name?: string;
  managerId?: number;
}
```

## 3. Repository Interface (`src/interfaces/IDepartmentRepository.ts`)

```typescript
import { Department } from "@prisma/client";
import { CreateDepartmentDto, UpdateDepartmentDto } from "../dtos/department.dto";
import { PaginatedResult } from "./IEmployeeRepository";

export interface IDepartmentRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<Department>>;
  findById(id: number): Promise<Department | null>;
  create(data: CreateDepartmentDto): Promise<Department>;
  update(id: number, data: UpdateDepartmentDto): Promise<Department>;
  delete(id: number): Promise<Department>;
}
```

## 4. Service Interface (`src/interfaces/IDepartmentService.ts`)

```typescript
import { Department } from "@prisma/client";
import { CreateDepartmentDto, UpdateDepartmentDto } from "../dtos/department.dto";
import { PaginatedResult } from "./IEmployeeRepository";

export interface IDepartmentService {
  getAllDepartments(page: number, limit: number): Promise<PaginatedResult<Department>>;
  getDepartmentById(id: number): Promise<Department>;
  createDepartment(data: CreateDepartmentDto): Promise<Department>;
  updateDepartment(id: number, data: UpdateDepartmentDto): Promise<Department>;
  deleteDepartment(id: number): Promise<Department>;
}
```

## 5. Repository Implementation (`src/repositories/DepartmentRepository.ts`)

```typescript
import { inject, injectable } from "inversify";
import { Department, PrismaClient } from "@prisma/client";
import { IDepartmentRepository } from "../interfaces/IDepartmentRepository";
import { CreateDepartmentDto, UpdateDepartmentDto } from "../dtos/department.dto";
import { PaginatedResult } from "../interfaces/IEmployeeRepository";
import { TYPES } from "../constants/types";

@injectable()
export class DepartmentRepository implements IDepartmentRepository {
  constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<Department>> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.department.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      this.prisma.department.count(),
    ]);
    return { data, total, page, limit };
  }

  async findById(id: number): Promise<Department | null> {
    return this.prisma.department.findUnique({ where: { id } });
  }

  async create(data: CreateDepartmentDto): Promise<Department> {
    return this.prisma.department.create({ data });
  }

  async update(id: number, data: UpdateDepartmentDto): Promise<Department> {
    return this.prisma.department.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Department> {
    return this.prisma.department.delete({ where: { id } });
  }
}
```

## 6. Service Implementation (`src/services/DepartmentService.ts`)

```typescript
import { injectable, inject } from "inversify";
import { Department } from "@prisma/client";
import { IDepartmentService } from "../interfaces/IDepartmentService";
import { IDepartmentRepository } from "../interfaces/IDepartmentRepository";
import { CreateDepartmentDto, UpdateDepartmentDto } from "../dtos/department.dto";
import { PaginatedResult } from "../interfaces/IEmployeeRepository";
import { TYPES } from "../constants/types";
import { Logger } from "../utils/Logger";
import { NotFoundError } from "../errors/AppError";

const logger = new Logger("DepartmentService");

@injectable()
export class DepartmentService implements IDepartmentService {
  constructor(
    @inject(TYPES.DepartmentRepository) private repo: IDepartmentRepository
  ) {}

  async getAllDepartments(page: number, limit: number): Promise<PaginatedResult<Department>> {
    logger.info("Fetching all departments", { page, limit });
    try {
      return await this.repo.findAll(page, limit);
    } catch (error) {
      logger.error("Failed to fetch departments", error);
      throw error;
    }
  }

  async getDepartmentById(id: number): Promise<Department> {
    logger.info("Fetching department by id", { id });
    try {
      const dept = await this.repo.findById(id);
      if (!dept) throw new NotFoundError(`Department with id ${id} not found`);
      return dept;
    } catch (error) {
      logger.error("Failed to fetch department", error);
      throw error;
    }
  }

  async createDepartment(data: CreateDepartmentDto): Promise<Department> {
    logger.info("Creating department", { name: data.name });
    try {
      const dept = await this.repo.create(data);
      logger.info("Created department", { id: dept.id });
      return dept;
    } catch (error) {
      logger.error("Failed to create department", error);
      throw error;
    }
  }

  async updateDepartment(id: number, data: UpdateDepartmentDto): Promise<Department> {
    logger.info("Updating department", { id });
    try {
      const existing = await this.repo.findById(id);
      if (!existing) throw new NotFoundError(`Department with id ${id} not found`);
      const dept = await this.repo.update(id, data);
      logger.info("Updated department", { id });
      return dept;
    } catch (error) {
      logger.error("Failed to update department", error);
      throw error;
    }
  }

  async deleteDepartment(id: number): Promise<Department> {
    logger.info("Deleting department", { id });
    try {
      const existing = await this.repo.findById(id);
      if (!existing) throw new NotFoundError(`Department with id ${id} not found`);
      const dept = await this.repo.delete(id);
      logger.info("Deleted department", { id });
      return dept;
    } catch (error) {
      logger.error("Failed to delete department", error);
      throw error;
    }
  }
}
```

## 7. Controller (`src/controllers/DepartmentController.ts`)

```typescript
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IDepartmentService } from "../interfaces/IDepartmentService";
import { TYPES } from "../constants/types";

@injectable()
export class DepartmentController {
  constructor(
    @inject(TYPES.DepartmentService) private service: IDepartmentService
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Math.max(1, parseInt(req.query["page"] as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query["limit"] as string) || 20));
      const result = await this.service.getAllDepartments(page, limit);
      res.status(200).json(result);
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params["id"] as string);
      const dept = await this.service.getDepartmentById(id);
      res.status(200).json(dept);
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dept = await this.service.createDepartment(req.body);
      res.status(201).json(dept);
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params["id"] as string);
      const dept = await this.service.updateDepartment(id, req.body);
      res.status(200).json(dept);
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params["id"] as string);
      const dept = await this.service.deleteDepartment(id);
      res.status(200).json(dept);
    } catch (error) { next(error); }
  }
}
```

## 8. Container Binding (`src/containers/inversify.config.ts`)

```typescript
// Add these lines:
import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { DepartmentService } from "../services/DepartmentService";
import { DepartmentController } from "../controllers/DepartmentController";

container.bind(TYPES.DepartmentRepository).to(DepartmentRepository);
container.bind(TYPES.DepartmentService).to(DepartmentService);
container.bind(TYPES.DepartmentController).to(DepartmentController);
```

## 9. Route (`src/routes/departmentRoutes.ts`)

```typescript
import { Router } from "express";
import { container } from "../containers/inversify.config";
import { DepartmentController } from "../controllers/DepartmentController";
import { TYPES } from "../constants/types";

const router = Router();
const ctrl = container.get<DepartmentController>(TYPES.DepartmentController);

router.get("/", (req, res, next) => ctrl.getAll(req, res, next));
router.get("/:id", (req, res, next) => ctrl.getById(req, res, next));
router.post("/", (req, res, next) => ctrl.create(req, res, next));
router.put("/:id", (req, res, next) => ctrl.update(req, res, next));
router.delete("/:id", (req, res, next) => ctrl.delete(req, res, next));

export default router;
```

## 10. Mount in server.ts

```typescript
import departmentRoutes from "./routes/departmentRoutes";
app.use("/api/departments", departmentRoutes);
```

## Error Classes (`src/errors/AppError.ts`)

```typescript
export class NotFoundError extends AppError {
  constructor(message: string) { super(message, 404); }
}
export class ConflictError extends AppError {
  constructor(message: string) { super(message, 409); }
}
export class ValidationError extends AppError {
  constructor(message: string) { super(message, 400); }
}
```
