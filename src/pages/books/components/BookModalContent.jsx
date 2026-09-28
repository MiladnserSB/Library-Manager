// src/pages/books/components/BookModalContent.jsx
import CustomForm from "../../../components/CustomForm";
import { bookFields, borrowFields } from "../data/bookFields";

const BookModalContent = ({
  modalMode,
  selectedBook,
  formData,
  onInputChange,
  onSubmit,
  onCancelDelete,
  onConfirmDelete,
}) => {
  if (modalMode === "DELETE") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-bold text-gray-800">{selectedBook?.title}</span>
          ?
        </p>
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancelDelete}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirmDelete}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  const fields = modalMode === "BORROW" ? borrowFields : bookFields;
  const submitLabel =
    modalMode === "ADD"
      ? "Create Book"
      : modalMode === "EDIT"
        ? "Save Changes"
        : "Confirm Borrow";

  return (
    <CustomForm
      fields={fields}
      formData={formData}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
    />
  );
};

export default BookModalContent;
