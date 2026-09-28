// src/pages/books/Books.jsx
import { useEffect, useState } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomTable from "../../components/CustomTable";
import CustomModal from "../../components/CustomModal";
import BookActions from "./components/BookActions";
import BookModalContent from "./components/BookModalContent";
import { bookHeaders } from "./data/dummyBooks.js";
import { request } from "../../lib/services/api.js";
import LoadingBook from "../../components/LoadingBook.jsx";
const Books = () => {
  // 1. الحالات البياناتية
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  console.log(borrows);

  // 2. حالات التحكم بالمودال
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("ADD"); // "ADD" | "EDIT" | "DELETE" | "BORROW"
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    authorId: "",
    available: true,
    borrowerName: "",
    borrowDate: "",
    returnDate: "",
  });

  useEffect(() => {
    const fetchBooksAndBorrows = async () => {
      try {
        setIsLoading(true);
        const result = await request("books");
        setBooks(result);
        console.log(result);
        const borrowsResult = await request("borrows");
        setBorrows(borrowsResult);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Failed to fetch books and borrows:", error);
        setIsLoading(false);
      }
    };
    fetchBooksAndBorrows();
  }, []);
  // معالجة المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // فتح المودال حسب نوع العملية
  const handleOpenAdd = () => {
    setModalMode("ADD");
    setSelectedBook(null);
    setFormData({ title: "", category: "", authorId: "", available: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (book) => {
    setModalMode("EDIT");
    setSelectedBook(book);
    setFormData({ ...book });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (book) => {
    setModalMode("DELETE");
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleOpenBorrow = (book) => {
    const today = new Date().toISOString().split("T")[0];
    setModalMode("BORROW");
    setSelectedBook(book);
    setFormData({ borrowerName: "", borrowDate: today, returnDate: "" });
    setIsModalOpen(true);
  };

  // إرجاع الكتاب
  const handleReturnBook = async (book) => {
    try {
      console.log("Hello");

      const existedBorrow = borrows.find((borrow) => borrow.bookId == book.id);
      console.log(existedBorrow);

      if (existedBorrow) {
        await request(`borrows/${existedBorrow.id}`, "DELETE");
      }
      await request(`books/${book.id}`, "PUT", { ...book, available: true });

      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, available: true } : b)),
      );
      setBorrows((prev) => prev.filter((borrow) => borrow.bookId !== book.id));
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };

  // إرسال النماذج (ADD / EDIT / BORROW)
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "ADD") {
        const newBook = {
          title: formData.title,
          category: formData.category,
          authorId: Number(formData.authorId),
          available: Boolean(formData.available),
        };

        // 1. Send POST request to backend API
        const response = await request("books", "POST", newBook);

        // 2. Use the created book object returned by your database (which includes the real DB id)
        setBooks((prev) => [...prev, response]);
      } else if (modalMode === "EDIT") {
        const editedBook = {
          ...selectedBook,
          title: formData.title,
          category: formData.category,
          authorId: Number(formData.authorId),
          available: Boolean(formData.available),
        };

        // 1. Send PUT/PATCH request to 'books/:id'
        const response = await request(
          `books/${selectedBook.id}`,
          "PUT",
          editedBook,
        );

        // 2. Update state with database response
        setBooks((prev) =>
          prev.map((b) => (b.id === selectedBook.id ? response : b)),
        );
      } else if (modalMode === "BORROW") {
        const borrowedBook = {
          bookId: selectedBook.id,
          borrowerName: formData.borrowerName,
          borrowDate: formData.borrowDate,
          returnDate: formData.returnDate,
        };

        // 1. Send POST to 'borrows' endpoint
        const borrowResponse = await request("borrows", "POST", borrowedBook);

        // 2. Patch the book status to available: false
        await request(`books/${selectedBook.id}`, "PUT", {
          ...selectedBook,
          available: false,
        });

        setBorrows((prev) => [...prev, borrowResponse]);
        setBooks((prev) =>
          prev.map((b) =>
            b.id === selectedBook.id ? { ...b, available: false } : b,
          ),
        );
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit form data:", error);
      // Optional: add a UI notification alert here
    }
  };

  // تأكيد الحذف
  const handleConfirmDelete = async () => {
    try {
      // 1. Send DELETE request to backend endpoint
      await request(`books/${selectedBook.id}`, "DELETE");

      // 2. Safely wipe it out of UI states
      setBooks((prev) => prev.filter((b) => b.id !== selectedBook.id));
      setBorrows((prev) => prev.filter((b) => b.bookId !== selectedBook.id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  // تصفية الكتب
  const filteredBooks = books.filter(
    (book) =>
      book.authorId == searchValue ||
      book.category?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const getModalTitle = () => {
    switch (modalMode) {
      case "ADD":
        return "Add New Book";
      case "EDIT":
        return "Edit Book";
      case "DELETE":
        return "Confirm Delete";
      case "BORROW":
        return "Borrow Book";
      default:
        return "";
    }
  };
  if (isLoading) {
    return (
      <main className="w-full h-[80vh] flex items-center justify-center bg-white">
        <LoadingBook />
      </main>
    );
  }
  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* شريط البحث والأزرار */}
      <div className="flex justify-between items-center mb-4">
        <CustomFilter
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          placeholder="Search by category or author ID..."
        />
        <button
          type="button"
          onClick={handleOpenAdd}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer shadow-sm"
        >
          Add Book
        </button>
      </div>

      <CustomTable
        headers={bookHeaders}
        data={filteredBooks}
        renderActions={(book) => (
          <BookActions
            book={book}
            onEdit={() => handleOpenEdit(book)}
            onDelete={() => handleOpenDelete(book)}
            onBorrow={() => handleOpenBorrow(book)}
            onReturn={() => handleReturnBook(book)}
          />
        )}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getModalTitle()}
      >
        <BookModalContent
          modalMode={modalMode}
          selectedBook={selectedBook}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmitForm}
          onCancelDelete={() => setIsModalOpen(false)}
          onConfirmDelete={handleConfirmDelete}
        />
      </CustomModal>
    </main>
  );
};

export default Books;
