const BookActions = ({ book, onEdit, onDelete, onBorrow, onReturn }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {book.available ? (
        <button
          type="button"
          onClick={onBorrow}
          className="group relative inline-flex items-center gap-1.5 bg-linear-to-r from-orange-500 to-amber-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-orange-400/30 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
            />
          </svg>
          <span>Borrow</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onReturn}
          className="group relative inline-flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-teal-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-emerald-500/30 shadow-md shadow-emerald-600/30 hover:shadow-lg hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          <span>Return</span>
        </button>
      )}

      <button
        type="button"
        onClick={onEdit}
        className="group relative inline-flex items-center gap-1.5 bg-amber-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-amber-400/30 shadow-md shadow-amber-500/30 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <span>Edit</span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="group relative inline-flex items-center gap-1.5 bg-red-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-red-400/30 shadow-md shadow-red-500/30 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <span>Delete</span>
      </button>
    </div>
  );
};

export default BookActions;
