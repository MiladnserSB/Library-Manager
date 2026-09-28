const CustomTable = ({ headers = [], data = [], renderActions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
            <tr>
              {headers.map((header) => (
                <th key={header.key || header} className="px-6 py-3.5">
                  {typeof header === "object" ? header.label : header}
                </th>
              ))}
              {renderActions ? (
                <th className="px-6 py-3.5 text-center">Actions</th>
              ) : null}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {headers.map((header) => {
                    const fieldKey =
                      typeof header === "object" ? header.key : header;
                    return (

                      <td key={fieldKey} className="px-6 py-4">
                        {item[fieldKey] !== undefined ? item[fieldKey] : "-"}
                      </td>
                    );
                  })}

                  {renderActions ? (
                    <td className="px-6 py-4 text-center">
                      {renderActions(item)}
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + (renderActions ? 1 : 0)}
                  className="px-6 py-8 text-center text-gray-400"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
