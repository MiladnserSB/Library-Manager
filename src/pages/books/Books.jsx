// src/pages/books/Books.jsx
import { useEffect, useState } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomTable from "../../components/CustomTable";
import CustomModal from "../../components/CustomModal";
import BookActions from "./components/BookActions";
import BookModalContent from "./components/BookModalContent";
import { dummyBooks as initialBooks, bookHeaders } from "./data/dummyBooks.js";

const Books = () => {
  // 1. الحالات البياناتية
  const [books, setBooks] = useState(initialBooks);
  const [borrows, setBorrows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // 2. حالات التحكم بالمودال
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
  const handleReturnBook = (book) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? { ...b, available: true } : b)),
    );
    setBorrows((prev) => prev.filter((borrow) => borrow.bookId !== book.id));
  };

  // إرسال النماذج (ADD / EDIT / BORROW)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (modalMode === "ADD") {
      const newBook = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        authorId: Number(formData.authorId),
        available: Boolean(formData.available),
      };
      setBooks((prev) => [...prev, newBook]);
    } else if (modalMode === "EDIT") {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === selectedBook.id
            ? {
                ...b,
                title: formData.title,
                category: formData.category,
                authorId: Number(formData.authorId),
                available: Boolean(formData.available),
              }
            : b,
        ),
      );
    } else if (modalMode === "BORROW") {
      const newBorrow = {
        id: Date.now(),
        bookId: selectedBook.id,
        borrowerName: formData.borrowerName,
        borrowDate: formData.borrowDate,
        returnDate: formData.returnDate,
      };
      setBorrows((prev) => [...prev, newBorrow]);
      setBooks((prev) =>
        prev.map((b) =>
          b.id === selectedBook.id ? { ...b, available: false } : b,
        ),
      );
    }
    setIsModalOpen(false);
  };

  // تأكيد الحذف
  const handleConfirmDelete = () => {
    setBooks((prev) => prev.filter((b) => b.id !== selectedBook.id));
    setBorrows((prev) => prev.filter((b) => b.bookId !== selectedBook.id));
    setIsModalOpen(false);
  };

  // تصفية الكتب
  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
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

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* شريط البحث والأزرار */}
      <div className="flex justify-between items-center mb-4">
        <CustomFilter
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          placeholder="Search by category or title"
        />
        <button
          type="button"
          onClick={handleOpenAdd}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer shadow-sm"
        >
          Add Book
        </button>
      </div>

      {/* الجدول الرئيسي */}
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

      {/* المودال الشامل */}
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
