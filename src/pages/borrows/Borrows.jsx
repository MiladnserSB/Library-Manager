import { useState, useEffect } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomTable from "../../components/CustomTable";
import LoadingBook from "../../components/LoadingBook";
import { request } from "../../lib/services/api.js";
import { borrowHeaders } from "./data/borrowHeaders.js";

const Borrows = () => {
  const [borrows, setBorrows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        setIsLoading(true);
        const borrowsResult = await request("borrows");
        setBorrows(borrowsResult);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to fetch books and borrows:", error);
        setIsLoading(false);
      }
    };
    fetchBorrows();
  }, []);

  const filteredBorrows = borrows.filter((borrow) => {
    const term = searchValue.toLowerCase();
    return (
      borrow.borrowerName?.toLowerCase().includes(term) ||
      String(borrow.bookId).includes(term)
    );
  });

  const todayStr = new Date().toISOString().split("T")[0];

  const checkDelayedReturn = filteredBorrows.map((borrow) => ({
    ...borrow,
    returnDate:
      todayStr > borrow.returnDate ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200/60 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span>{borrow.returnDate} (Delayed)</span>
        </span>
      ) : (
        borrow.returnDate
      ),
  }));

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
          placeholder="Search by borrower name or book ID..."
        />
      </div>

      <CustomTable headers={borrowHeaders} data={checkDelayedReturn} />
    </main>
  );
};

export default Borrows;
