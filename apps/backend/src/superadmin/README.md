# Superadmin Namespace 🛡️

This folder contains the foundational logic for the reserved `SUPERADMIN` role.

## 🚫 Rules (Locked)
1.  **Scope**: This code is for Phase 3+ scaling. Do NOT implement public endpoints here yet.
2.  **Auth**: Superadmins authenticate via the same Supabase Auth as users, but have the `SUPERADMIN` enum role.
3.  **Safety**:
    *   ❌ Cannot delete ledger records.
    *   ❌ Cannot edit financial history.
    *   ❌ Cannot impersonate silently.
4.  **Auditing**: ALL Superadmin actions must be logged to `audit_logs`.

## Current Implementation
- `superadmin.guard.ts`: Protects future routes.
- `superadmin.module.ts`: Placeholder for dependency injection.
