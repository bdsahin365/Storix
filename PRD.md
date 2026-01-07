# 📘 PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Product Name:** Storix Pro
**Tagline:** বাংলাদেশের দোকানের জন্য ডিজিটাল খাতা

---

## 1. 🎯 Product Vision

বাংলাদেশের ছোট ও মাঝারি দোকানদারদের জন্য একটি সহজ, Bangla-first, voice-enabled অ্যাপ—যেখানে তারা:

*   বাকি (credit) ম্যানেজ করতে পারবে
*   স্টক ও দাম বুঝতে পারবে
*   লাভ/ক্ষতি জানতে পারবে
*   হালখাতা ডিজিটালভাবে করতে পারবে
*   গ্রাহকের সাথে বিশ্বাস তৈরি করতে পারবে

👉 **কোনো জটিল accounting নয়**
👉 **Excel বা খাতা দরকার নেই**

---

## 2. 👥 Target Users

**Primary User**
*   ছোট দোকানদার (গ্রোসারি, ফার্মেসি, হার্ডওয়্যার)
*   বয়স: 25–60
*   Bangla-speaking
*   Android ফোন ব্যবহারকারী
*   হিসাব রাখে খাতায় / মনে / WhatsApp

**Secondary Users**
*   দোকানের কর্মচারী
*   গ্রাহক (SMS / WhatsApp রিসিভার)

---

## 3. 📱 Platform

*   **Android App (Primary)**
*   Offline-first
*   Low-end Android support
*   Web Admin (Secondary)

---

## 4. 🧱 Core Modules (High Level)

1.  User & Shop Setup
2.  Customer & Baki Management
3.  Voice Command System
4.  Stock & Price Management
5.  Profit & Reports
6.  Halkhata System
7.  Reminder & Notification
8.  Staff & Role Management
9.  Export & Sharing
10. Security & Backup

---

## 5. 📲 Screen-by-Screen Requirements

### 5.1 Onboarding & Setup
**Screens**
1.  Language Select (Bangla default)
2.  Mobile Number Login (OTP)
3.  Shop Info (Name, Owner, Phone, Address)
4.  Feature Selection (Baki ✅, Stock ⬜, Profit ⬜, Halkhata ⬜)

**Acceptance Criteria**
*   3 মিনিটের মধ্যে onboarding শেষ
*   কোনো payment দরকার নেই onboarding এ

### 5.2 Home Screen (Dashboard)
**Components**
*   Today Summary Card (আজকের বিক্রি, নতুন বাকি, আদায়)
*   Quick Actions (➕ বাকি যোগ, ➕ বিক্রি, 🎤 ভয়েস)
*   Outstanding Baki (Top 5)

### 5.3 Customer & Baki Module
**Features**
*   **Customer Add**: Name, Phone (optional)
*   **Add Baki**: Amount, Note
*   **Receive Payment**: Customer Ledger, Overdue Highlight

**Rules**
*   কোনো বাকি ডিলিট করা যাবে না (only adjust)
*   সব পরিবর্তনে audit log থাকবে

### 5.4 🎤 Voice Command System
**Supported Intents (MVP)**
*   Add baki
*   Receive payment
*   Ask outstanding
*   Start halkhata

**Flow**
1.  Mic press -> Speak (≤10 sec)
2.  Transcription shown -> Parsed preview
3.  Confirm → Save

**Mandatory Rule**
❗ টাকা সংক্রান্ত সব কাজ → Confirm required

### 5.5 Stock & Price Module (Optional)
**Product Fields**
*   Product Name
*   Purchase Price (ক্রয় মূল্য)
*   Selling Price (বিক্রয় মূল্য)
*   Quantity

**Operations**
*   Stock In (Purchase)
*   Stock Out (Sale)
*   Low Stock Alert (soft)

**Rules**
*   Stock mismatch হলে sell block হবে না
*   Price override allowed

### 5.6 Profit & Reports
**Profit Types**
*   Expected Profit (Unpaid baki)
*   Realized Profit (Paid)

**Reports**: Daily / Monthly Sales, Profit, Outstanding, Stock Value

### 5.7 🇧🇩 Halkhata Module
**Actions**
*   Start Halkhata
*   Select Customers (All / Selected)
*   Per Customer: Full close, Partial close, Carry forward

**Output**: Halkhata Record, Archive old ledger
**Safety**: Preview mandatory, Undo allowed (24h)

### 5.8 🖨️ Printable Halkhata Card
**Formats**: PDF (A6/A5), Image (WhatsApp friendly)
**Content**: Shop Info, Customer Name, Date, Previous Due, Paid, New Due
**Actions**: Print, Download, Share via WhatsApp (1 click)

### 5.9 Reminder & Notification
*   **Customer Reminder**: SMS / WhatsApp (Soft / Medium / Final)
*   **Owner Summary**: Daily auto summary

### 5.10 Staff / Role Management
*   **Roles**: Owner, Staff
*   **Staff Permissions**: Add sale, Add payment
*   **Owner Only**: Delete, Price change, Reports, Halkhata

### 5.11 Supplier Ledger
*   Supplier add, Purchase due, Payment tracking, Net position view

### 5.12 Export & Sharing
*   PDF/Excel export, Monthly summary

### 5.13 Security & Backup
*   PIN / Fingerprint, Auto backup (cloud), Device change restore, Voice audit logs

---

## 6. 📊 Non-Functional Requirements
*   **Performance**: ≤2 sec load
*   **Storage**: <50MB app
*   **Offline**: Full basic support
*   **Language**: Bangla-first
*   **Accessibility**: Large fonts

---

## 7. 🚀 Release Phases
*   **MVP (v1)**: Baki, Voice, Customer, Basic Reminder
*   **v2**: Stock, Profit, Halkhata, Card Print
*   **v3**: Staff, Supplier, Payment Link

---

## 8. 🧠 Success Metrics
*   Daily active shops
*   Avg baki recovered
*   Retention (30/90 days)
*   Voice usage %
*   Paid conversion %

---

## 9. ❌ Out of Scope (Now)
*   Full accounting
*   GST/VAT automation
*   Loyalty points
*   Ads

---

**Final Statement**
Baki Manager is not POS, not Accounting. It is survival software for Bangladeshi shops.
