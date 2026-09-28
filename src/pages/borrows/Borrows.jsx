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
        }, 2000);
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

      <CustomTable headers={borrowHeaders} data={filteredBorrows} />
    </main>
  );
};

export default Borrows;
