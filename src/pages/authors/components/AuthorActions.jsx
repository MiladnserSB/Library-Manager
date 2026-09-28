
const AuthorActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="bg-amber-500 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-amber-600 transition-colors cursor-pointer"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="bg-red-500 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-red-600 transition-colors cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default AuthorActions;
