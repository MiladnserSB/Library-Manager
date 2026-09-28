// رؤوس الجدول الخاصة بسجلات الاستعارة
export const borrowHeaders = [
  { key: "id", label: "ID" },
  { key: "bookId", label: "Book ID" },
  { key: "borrowerName", label: "Borrower Name" },
  { key: "borrowDate", label: "Borrow Date" },
  { key: "returnDate", label: "Return Date" },
];

// البيانات الابتدائية لسجلات الاستعارة
export const dummyBorrows = [
  {
    id: 1,
    bookId: 2,
    borrowerName: "Milad AlNser",
    borrowDate: "2026-09-25",
    returnDate: "2026-10-05",
  },
  {
    id: 2,
    bookId: 4,
    borrowerName: "Sami Ahmad",
    borrowDate: "2026-09-27",
    returnDate: "2026-10-10",
  },
];
