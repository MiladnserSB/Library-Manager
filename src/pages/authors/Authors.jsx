import { useEffect, useState } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomTable from "../../components/CustomTable";
import CustomModal from "../../components/CustomModal";
import AuthorActions from "./components/AuthorActions";
import AuthorModalContent from "./components/AuthorModalContent";
import LoadingBook from "../../components/LoadingBook";
import { request } from "../../lib/services/api.js";
import { authorHeaders } from "./data/authorsHeaders.js";

const initialFormState = { name: "", nationality: "" };

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("ADD");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setIsLoading(true);
        const authorsFetched = await request("authors");
        setAuthors(authorsFetched);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
        setIsLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (mode, author = null) => {
    setModalMode(mode);
    setSelectedAuthor(author);
    setFormData(author ? { ...author } : initialFormState);
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (modalMode === "ADD") {
      const newAuthor = { id: Date.now(), ...formData };

      try {
        const response = await request("authors", "POST", newAuthor);
        setAuthors((prev) => [...prev, response]);
      } catch (error) {
        console.error("Failed to add author:", error);
      }
    } else if (modalMode === "EDIT") {
      try {
        const editedAuthor = { ...selectedAuthor, ...formData };
        const response = await request(
          `authors/${selectedAuthor.id}`,
          "PUT",
          editedAuthor,
        );
        setAuthors((prev) =>
          prev.map((a) => (a.id === selectedAuthor.id ? response : a)),
        );
      } catch (error) {
        console.error("Failed to edit author:", error);
      }
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await request(`authors/${selectedAuthor.id}`, "DELETE");
      setAuthors((prev) => prev.filter((a) => a.id !== selectedAuthor.id));
    } catch (error) {
      console.error("Failed to delete author:", error);
    }
    setIsModalOpen(false);
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      author.nationality?.toLowerCase().includes(searchValue.toLowerCase()),
  );

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
          placeholder="Search by name or nationality"
        />
        <button
          type="button"
          onClick={() => handleOpenModal("ADD")}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer shadow-sm"
        >
          Add Author
        </button>
      </div>

      <CustomTable
        headers={authorHeaders}
        data={filteredAuthors}
        renderActions={(author) => (
          <AuthorActions
            onEdit={() => handleOpenModal("EDIT", author)}
            onDelete={() => handleOpenModal("DELETE", author)}
          />
        )}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "ADD"
            ? "Add New Author"
            : modalMode === "EDIT"
              ? "Edit Author"
              : "Confirm Delete"
        }
      >
        <AuthorModalContent
          modalMode={modalMode}
          selectedBook={selectedAuthor}
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

export default Authors;
