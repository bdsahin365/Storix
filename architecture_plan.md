# Storix Pro - System Architecture & Roadmap

## 1. Monorepo Structure

Standard workspace-based monorepo (Turborepo compatible).

```text
/
├── apps/
│   ├── backend/         # [NestJS] The Brain. API Gateway, Business Logic.
│   ├── web/             # [Next.js] Admin Dashboard, Reports, Halkhata.
│   └── mobile/          # [React Native] Offline-first Android App.
├── packages/
│   └── shared-types/    # [TypeScript] Shared DTOs, Enums, Interfaces.
├── package.json         # Workspace root.
└── .env                 # [Local Only] Secrets (SUPABASE_URL, SERVICE_ROLE_KEY).
```

## 2. Backend Architecture

**Pattern:** Thin Client, Thick Server.
**Constraint:** Frontends **NEVER** touch Supabase directly.

```text
[Web App]      [Android App]
    |               |
    | (HTTPS/REST)  | (Sync Queue)
    v               v
+-----------------------------------+
|       NestJS API Gateway          |
|-----------------------------------|
|   1. Auth Guard (Supabase JWT)    |
|   2. Validation (DTOs)            |
|   3. Service Layer (Logic)        |
|   4. Repository Layer (TypeORM)   |
+-----------------------------------+
                | (Service Role)
                v
+-----------------------------------+
|      Supabase.com (SaaS)          |
|-----------------------------------|
|  PostgreSQL (Data Storage)        |
|  GoTrue (Auth/OTP)                |
|  Storage (Backups/PDFs)           |
+-----------------------------------+
```

## 3. NestJS Modules (Phased)

1.  **AppModule** (Root, Config)
2.  **AuthModule** (Supabase Strategy, Guards, RBAC)
3.  **ShopModule** (Shop setup, Settings, Currency)
4.  **StaffModule** (User management, Permissions)
5.  **LedgerModule** (Core Transactional Logic - Customer/Supplier/Expense)
6.  **InventoryModule** (Product, Stock, Price History)
7.  **HalkhataModule** (Seasonal events, Card generation, Archive)
8.  **ReportModule** (Profit/Loss, Aggregation)
9.  **SyncModule** (Handling Android offline queues)
10. **VoiceModule** (Future: Speech-to-text JSON processing)
11. **BackupModule** (Exports)

## 4. PostgreSQL Tables (Preliminary)

*Strictly Ledger-Based. No mutable "Update Balance" columns.*

*   `shops`: `(id, name, settings_json, ...)`
*   `users`: `(id, shop_id, role, supabase_uid, ...)`
*   `contacts`: `(id, shop_id, type [CUSTOMER/SUPPLIER], name, phone, ...)`
*   `products`: `(id, shop_id, name, buy_price, sell_price, stock_unit)`
*   `transactions`: `(id, shop_id, type [SALE/PAYMENT/PURCHASE/EXPENSE], amount, contact_id, timestamp)` -> **Source of Truth**
*   `transaction_items`: `(id, transaction_id, product_id, quantity, unit_price)`
*   `halkhatas`: `(id, shop_id, name, event_date, status)`
*   `halkhata_entries`: `(id, halkhata_id, contact_id, due_snapshot, paid_amount)`

## 5. Offline Sync Strategy (Android)

**Strategy:** "Optimistic UI + Queue Replay"

1.  **Read:** Android downloads "Delta" (changes since `last_synced_at`) into local SQLite.
2.  **Write:** Android writes to SQLite `local_queue` table immediately.
3.  **Sync Queue:**
    *   Iterate `local_queue`.
    *   Send structured payloads to NestJS `SyncModule`.
    *   NestJS executes logic (e.g., "Create Sale").
    *   If success: Delete from `local_queue`.
    *   If error (Business Logic): Mark as "Conflict" for user resolution.

## 6. Assumptions & Questions

**Assumptions:**
1.  **Secrets:** We strictly use `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Backend only), and `DATABASE_URL` (for TypeORM) from environment variables.
2.  **Auth:** Supabase Auth issues JWTs. NestJS validates them using the Supabase JWT Secret (via `SUPABASE_JWT_SECRET` or fetching JWKS if preferred, but secret is faster for checking signature).

**Questions:**
1.  Which specific Supabase region should we target (e.g., Singapore for Bangladesh latency)?
2.  Do we enforce phone OTP strictly for all users, or allow email for Admin/Owner?
