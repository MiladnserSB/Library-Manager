
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
    name: "authorId",  
    label: "Author Name",
    type: "select",
    required: true,
    options: [],
    placeholder: "Select author...",
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
    type: "date",
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

export const bookHeaders = ["id", "title", "author", "category", "available"];
