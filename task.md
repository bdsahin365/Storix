# Storix Project Tasks

## Module 1: Authentication & Shop Setup
- [x] Install Backend Dependencies (`@nestjs/config`, `@supabase/supabase-js`, `jwks-rsa`)
- [x] Configure `ConfigModule` and `TypeOrmModule` in `app.module.ts`
- [x] Create `User` Entity (Postgres)
- [x] Create `Shop` Entity (Postgres)
- [x] Implement `SupabaseStrategy` (JWKS / ES256)
- [x] Implement `UsersService` (Sync User from Supabase)
- [x] Implement `ShopsService` (Transactional Shop Creation)
- [x] Create `ShopsController` and `UsersController`
- [x] Remove Legacy Auth Code
- [x] Verify Backend Compilation (Done)

## Module 2: Customer & Baki Ledger
- [x] Create `Customer` Entity (with Cached Balance)
- [x] Create `Transaction` Entity (Double Entry Support)
- [x] Implement `TransactionsService` (Atomic Update Logic)
- [x] Create `CustomersController` and `TransactionsController`
- [x] Verify Module Integration (Compilation Success)

## Module 2.5: Superadmin Foundation (Completed)
- [x] Update `UserRole` Enum (Add SUPERADMIN)
- [x] Create `src/superadmin` Namespace (Guard, Module, README)
- [x] Create `AuditLog` Entity (`src/audit`)
- [x] Verify Architecture

## Module 3: Stock & Price Management (Completed)
- [x] Create `Product` Entity (with Cached Stock)
- [x] Create `InventoryTransaction` Entity (Stock Ledger)
- [x] Create `SaleItem` Entity (Bridge)
- [x] Implement `InventoryService` (Atomic Stock In/Out)
- [x] Implement `SalesService` (Orchestrated Transaction: Money + Stock)
- [x] Implement Controllers (`Products`, `Inventory`, `Sales`)
- [x] Verify Module Integration (Compilation Success)

## Module 4: Profit & Reports
- [ ] Create `ReportModule`
- [ ] Implement Aggregation Logic

## Module 5: Halkhata System
- [ ] Create `Halkhata` Entity
- [ ] Implement Closing Logic

## Module 6: Web App & Mobile App
- [ ] Setup Frontend Projects
- [ ] Integrate with Backend
