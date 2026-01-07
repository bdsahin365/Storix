# Implementation Plan - Module 3: Stock & Price Management (Refined)

# Goal Description
Implement "Financial-Grade" Stock Management. Mirroring the Logic of Module 2 (Ledger), we introduce an **Inventory Ledger** where every stock change is an immutable record.

**Core Philosophy**:
1.  **Stock is Money**: Treat inventory items with the same rigor as cash.
2.  **Append-Only**: Never delete stock history.
3.  **Unified Transaction**: A Sale (Module 2) and a Stock Out (Module 3) MUST happen in the same database transaction.

## User Review Required
> [!IMPORTANT]
> **Superadmin Reserved Integration**: The `SUPERADMIN` role has been added (Module 2.5). While Module 3 doesn't explicitly use it yet, the architecture supports future "Force Adjustments" by Superadmins using the `ADJUSTMENT` transaction type.

## Proposed Changes

### Database Layer (TypeORM)
#### [NEW] `src/products/product.entity.ts`
- `id` (UUID), `shop_id`
- `name`, `is_active`
- `buy_price`, `sell_price`
- `cached_stock` (Derived from ledger)
- `low_stock_limit` (Soft warning threshold)

#### [NEW] `src/inventory/inventory-transaction.entity.ts`
- `type`: `STOCK_IN`, `STOCK_OUT`, `ADJUSTMENT` (Superadmin/Owner), `RETURN`
- `quantity`: Integer (Positive only)
- `reference_id`: Link to Sale (Module 2) or Purchase.
- `audit_log_id`: (Optional) Link to `AuditLog` for sensitive adjustments.

#### [NEW] `src/sales/sale-item.entity.ts`
- **Bridge Table**: Links `Transaction` (Money) -> `Product` (Stock).
- `transaction_id`, `product_id`
- `quantity`, `price_at_sale`

### Logic Layer (Services)
#### [NEW] `SalesService` (The Orchestrator)
- Extends `TransactionsService` (Module 2).
- `recordSale(shopId, items[], paymentDetails)`:
    1.  Start DB Transaction.
    2.  Create Financial Transaction (Module 2).
    3.  Loop Items:
        - Deduct Stock (Module 3).
        - Create SaleItem.
    4.  Commit.

#### [NEW] `InventoryService`
- `stockIn(productId, quantity, buyPrice)`:
    - Update average buy price? (Simple weighted average or LIFO? MVP: Overwrite buy_price with latest or keep manual).
    - **Decision**: Update `buy_price` to latest input.
    - Create `InventoryTransaction` (STOCK_IN).
    - Increment `cached_stock`.

### API Endpoints
#### `ProductsController`
- CRUD for Products.

#### `InventoryController`
- `POST /stock-in`: Add stock.

#### `SalesController`
- `POST /`: Orchestrated Sale (Money + Stock).

## Verification Plan
1.  **Stock In**: Add 10 items. Check `cached_stock` = 10.
2.  **Sales Integration**: Sell 2 items. Check `cached_stock` = 8. Check Financial Ledger has 'SALE'.
3.  **Fail Safety**: Try to sell with invalid data. Ensure Stock AND Money roll back.
