# Expense Tracker

A minimal transaction management module that records income and expenses, renders them to the UI, and maintains accurate totals. The system supports adding transactions, removing transactions, and recalculating balance states.

## Features

- Add income and expense transactions.
- Display transaction list with category, date, amount, and type icon.
- Remove transactions from both UI and data model.
- Maintain running totals for income, expense, and balance.
- Auto-capitalize category input.

## Core Logic

### Data Model

Transactions stored in an array:

```js
allTransactions = [ { type, amount, date, category }, ... ];
```

### Add Transaction

- Collects form values with `FormData`.
- Normalizes `type` and `category`.
- Inserts new record at the start of the array.
- Renders transaction item into the list.
- Recalculates totals.

### Remove Transaction

- Each delete button owns its own click handler.
- Locates its parent `.transaction-item`.
- Computes index by comparing DOM order.
- Removes array entry and DOM element.
- Updates totals.

## Calculation Rules

- Income values increase balance.
- Expense values decrease balance.
- Totals recomputed from `allTransactions` on every change.

## File Structure

- `index.html` → form, list, and total fields
- `style.css` → layout and display styles
- `script.js` → all transaction logic

## Screenshots

[!Desktop Screenshot]<img width="1920" height="947" alt="DesktopExpenseTrackerApp" src="https://github.com/user-attachments/assets/80bbe5e6-a215-4980-a6b9-01d6685f12c4" />
[!Desktop Screenshot with Data]
<img width="1920" height="947" alt="DesktopExpenseTrackerAppwithData" src="https://github.com/user-attachments/assets/ac2d7520-2f9b-4ac3-a661-ba01a09f65e2" />

## Known Constraints

- Requires valid date input.
- Relies on DOM ordering for removal index.
