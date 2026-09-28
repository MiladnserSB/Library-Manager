const BookActions = ({ book, onEdit, onDelete, onBorrow, onReturn }) => {
  return (
    <div className="flex items-center gap-2">
      {/* زر الاستعارة أو الإرجاع الديناميكي */}
      {book.available ? (
        <button
          type="button"
          onClick={onBorrow}
          className="bg-orange-500 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-orange-600 transition-colors"
        >
          Borrow
        </button>
      ) : (
        <button
          type="button"
          onClick={onReturn}
          className="bg-emerald-600 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-emerald-700 transition-colors"
        >
          Return
        </button>
      )}

      {/* زر التعديل */}
      <button
        type="button"
        onClick={onEdit}
        className="bg-amber-500 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-amber-600 transition-colors"
      >
        Edit
      </button>

      {/* زر الحذف */}
      <button
        type="button"
        onClick={onDelete}
        className="bg-red-500 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default BookActions;
