# Testing Reference

## Setup

```
src/test/
  unit/
    middlewares/    ← validate-*.middleware.spec.ts
    services/       ← *Service.spec.ts
  integration/
    repositories/   ← *Repository.spec.ts
    routes/         ← *Routes.spec.ts (supertest)
```

**Scripts** (`package.json`):
```json
"test": "jest",
"test:unit": "jest --testPathPattern=unit",
"test:integration": "jest --testPathPattern=integration"
```

**`jest.config.ts`**:
```typescript
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/test/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
};
```

---

## Unit Test: Middleware

No mocks needed. Test `next()` receives correct argument.

```typescript
// src/test/unit/middlewares/validate-create-department.middleware.spec.ts
function buildReq(body: Record<string, unknown>): Request {
  return { body } as Request;
}
const res = {} as Response;

function captureNext() {
  let received: unknown;
  const next: NextFunction = (arg?: unknown) => { received = arg; };
  return { next, received: () => received };
}

describe("validateCreateDepartment", () => {
  it("calls next() with no argument for valid payload", () => {
    const { next, received } = captureNext();
    validateCreateDepartment(buildReq({ name: "Engineering" }), res, next);
    expect(received()).toBeUndefined();
  });

  it("passes ValidationError when name is missing", () => {
    const { next, received } = captureNext();
    validateCreateDepartment(buildReq({}), res, next);
    expect(received()).toBeInstanceOf(ValidationError);
    expect((received() as ValidationError).statusCode).toBe(400);
  });
});
```

---

## Unit Test: Service

Mock repository with `jest.fn()`. Test business logic and error cases.

```typescript
// src/test/unit/services/DepartmentService.spec.ts
import { DepartmentService } from "../../../services/DepartmentService";
import { IDepartmentRepository } from "../../../interfaces/IDepartmentRepository";
import { NotFoundError, ConflictError } from "../../../errors/AppError";

const mockRepo: jest.Mocked<IDepartmentRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const service = new DepartmentService(mockRepo);

describe("DepartmentService", () => {
  describe("getDepartmentById", () => {
    it("returns department when found", async () => {
      const dept = { id: 1, name: "Engineering" };
      mockRepo.findById.mockResolvedValue(dept as any);
      const result = await service.getDepartmentById(1);
      expect(result).toEqual(dept);
    });

    it("throws NotFoundError when not found", async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.getDepartmentById(99))
        .rejects.toBeInstanceOf(NotFoundError);
    });
  });

  describe("createDepartment", () => {
    it("creates and returns department", async () => {
      const dto = { name: "HR" };
      const created = { id: 2, name: "HR" };
      mockRepo.create.mockResolvedValue(created as any);
      const result = await service.createDepartment(dto);
      expect(mockRepo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(created);
    });
  });

  describe("updateDepartment", () => {
    it("throws NotFoundError when department does not exist", async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.updateDepartment(99, { name: "New" }))
        .rejects.toBeInstanceOf(NotFoundError);
    });
  });

  describe("deleteDepartment", () => {
    it("throws NotFoundError when department does not exist", async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.deleteDepartment(99))
        .rejects.toBeInstanceOf(NotFoundError);
    });
  });
});
```

---

## Unit Test: EmployeeService (with ConflictError)

```typescript
describe("EmployeeService", () => {
  describe("createEmployee", () => {
    it("throws ConflictError when email already exists", async () => {
      mockRepo.findByEmail.mockResolvedValue({ id: 1, email: "a@b.com" } as any);
      await expect(service.createEmployee({ email: "a@b.com", name: "Alice", department: "IT" }))
        .rejects.toBeInstanceOf(ConflictError);
    });
  });

  describe("updateEmployee", () => {
    it("throws ConflictError when new email is taken by another employee", async () => {
      mockRepo.findById.mockResolvedValue({ id: 1, email: "old@b.com" } as any);
      mockRepo.findByEmail.mockResolvedValue({ id: 2, email: "new@b.com" } as any);
      await expect(service.updateEmployee(1, { email: "new@b.com" }))
        .rejects.toBeInstanceOf(ConflictError);
    });
  });
});
```

---

## Common Patterns

### Mock all methods at once
```typescript
const mockRepo = {
  findAll: jest.fn(),
  findById: jest.fn(),
  // ...
} as jest.Mocked<IMyRepository>;
```

### Reset mocks between tests
`clearMocks: true` in `jest.config.ts` handles this automatically.

### Test error propagation
```typescript
it("re-throws unexpected errors", async () => {
  mockRepo.findAll.mockRejectedValue(new Error("DB error"));
  await expect(service.getAllDepartments(1, 10)).rejects.toThrow("DB error");
});
```
