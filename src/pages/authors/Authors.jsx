import { useState } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomTable from "../../components/CustomTable";
import CustomModal from "../../components/CustomModal";
import AuthorActions from "./components/AuthorActions";
import AuthorModalContent from "./components/AuthorModalContent";
import {
  dummyAuthors as initialAuthors,
  authorHeaders,
} from "./data/dummyAuthors.js";

const initialFormState = { name: "", nationality: "" };

const Authors = () => {
  // البيانات والبحث
  const [authors, setAuthors] = useState(initialAuthors);
  const [searchValue, setSearchValue] = useState("");

  // حالات المودال والنموذج
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("ADD"); // "ADD" | "EDIT" | "DELETE"
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  // تحديث القيم
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // دالة موحدة واحترافية لفتح المودال بأي وضع (ADD, EDIT, DELETE)
  const handleOpenModal = (mode, author = null) => {
    setModalMode(mode);
    setSelectedAuthor(author);
    setFormData(author ? { ...author } : initialFormState);
    setIsModalOpen(true);
  };

  // حفظ البيانات (إضافة / تعديل)
  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (modalMode === "ADD") {
      const newAuthor = { id: Date.now(), ...formData };
      setAuthors((prev) => [...prev, newAuthor]);
    } else if (modalMode === "EDIT") {
      setAuthors((prev) =>
        prev.map((a) =>
          a.id === selectedAuthor.id ? { ...a, ...formData } : a,
        ),
      );
    }

    setIsModalOpen(false);
  };

  // تأكيد الحذف
  const handleConfirmDelete = () => {
    setAuthors((prev) => prev.filter((a) => a.id !== selectedAuthor.id));
    setIsModalOpen(false);
  };

  // فلترة المؤلفين بحسب الاسم أو الجنسية
  const filteredAuthors = authors.filter(
    (author) =>
      author.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      author.nationality?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* شريط التحكم العلوي */}
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

      {/* الجدول الرئيسي */}
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

      {/* المودال الشامل */}
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
          selectedAuthor={selectedAuthor}
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
