import { useEffect, useState } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomTable from "../../components/CustomTable";
import CustomModal from "../../components/CustomModal";
import BookActions from "./components/BookActions";
import BookModalContent from "./components/BookModalContent";
import { bookHeaders, bookFields, borrowFields } from "./data/bookFields.js";
import { request } from "../../lib/services/api.js";
import LoadingBook from "../../components/LoadingBook.jsx";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("ADD");
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
        const borrowsResult = await request("borrows");
        setBorrows(borrowsResult);
        const authorsResult = await request("authors");
        setAuthors(authorsResult);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to fetch books and borrows:", error);
        setIsLoading(false);
      }
    };
    fetchBooksAndBorrows();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleReturnBook = async (book) => {
    try {
      const existedBorrow = borrows.find((borrow) => borrow.bookId == book.id);
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

        const response = await request("books", "POST", newBook);
        setBooks((prev) => [...prev, response]);
      } else if (modalMode === "EDIT") {
        const editedBook = {
          ...selectedBook,
          title: formData.title,
          category: formData.category,
          authorId: Number(formData.authorId),
          available: Boolean(formData.available),
        };

        const response = await request(
          `books/${selectedBook.id}`,
          "PUT",
          editedBook,
        );

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

        const borrowResponse = await request("borrows", "POST", borrowedBook);

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
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await request(`books/${selectedBook.id}`, "DELETE");
      setBooks((prev) => prev.filter((b) => b.id !== selectedBook.id));
      setBorrows((prev) => prev.filter((b) => b.bookId !== selectedBook.id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const booksWithAuthorNames = books.map((book) => {
    const author = authors.find((a) => String(a.id) === String(book.authorId));
    return {
      ...book,
      author: author ? author.name : "Unknown Author",
    };
  });

  const filteredBooks = booksWithAuthorNames.filter(
    (book) =>
      book.author?.toLowerCase().includes(searchValue.toLowerCase()) ||
      book.category?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const dynamicBookFields = bookFields.map((field) => {
    if (field.name === "authorId") {
      return {
        ...field,
        options: authors.map((auth) => ({
          label: auth.name,
          value: String(auth.id),
        })),
      };
    }
    return field;
  });

  const currentFields =
    modalMode === "BORROW" ? borrowFields : dynamicBookFields;

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
      <div className="flex justify-between items-center mb-4">
        <CustomFilter
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          placeholder="Search by category or author name..."
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
          overrideFields={currentFields}
        />
      </CustomModal>
    </main>
  );
};

export default Books;
