import { useState } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomTable from "../../components/CustomTable";
import {
  dummyBorrows as initialBorrows,
  borrowHeaders,
} from "./data/dummyBorrows.js";

const Borrows = () => {
  const [borrows] = useState(initialBorrows);
  const [searchValue, setSearchValue] = useState("");

  // فلترة سجلات الاستعارة حسب اسم المستعير أو رقم الكتاب
  const filteredBorrows = borrows.filter((borrow) => {
    const term = searchValue.toLowerCase();
    return (
      borrow.borrowerName?.toLowerCase().includes(term) ||
      String(borrow.bookId).includes(term)
    );
  });

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* شريط البحث والتصفية */}
      <div className="flex justify-between items-center mb-4">
        <CustomFilter
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          placeholder="Search by borrower name or book ID..."
        />
      </div>

      {/* جدول البيانات بدون تمرير renderActions للعرض فقط */}
      <CustomTable headers={borrowHeaders} data={filteredBorrows} />
    </main>
  );
};

export default Borrows;
