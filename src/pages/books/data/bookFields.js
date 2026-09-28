// src/pages/books/data/bookFields.js

export const bookFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeholder: "Enter book title...",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    required: true,
    placeholder: "Fiction, Classic...",
  },
  {
    name: "authorName",
    label: "Author Name",
    type: "select",
    required: true,
    placeholder: "Enter author name...",
    options: [],
  },
  { name: "available", label: "Status", type: "boolean", required: true },
];

export const borrowFields = [
  {
    name: "borrowerName",
    label: "Borrower Name",
    type: "text",
    required: true,
    placeholder: "Enter borrower name...",
  },
  {
    name: "borrowDate",
    label: "Borrow Date (Today)",
    type: "text",
    required: true,
    readOnly: true,
  },
  {
    name: "returnDate",
    label: "Expected Return Date",
    type: "date",
    required: true,
  },
];

export const bookHeaders = ["id", "title", "authorId", "category", "available"];
