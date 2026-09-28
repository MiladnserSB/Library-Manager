const CustomForm = ({
  fields = [],
  formData,
  onInputChange,
  onSubmit,
  submitLabel = "Submit",
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((field) => {
        return (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onInputChange}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select {field.label}...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "boolean" ? (
              <select
                name={field.name}
                value={
                  formData[field.name] === undefined
                    ? ""
                    : String(formData[field.name])
                }
                onChange={(e) => {
                  const val =
                    e.target.value === "true"
                      ? true
                      : e.target.value === "false"
                        ? false
                        : "";
                  onInputChange({ target: { name: field.name, value: val } });
                }}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="true">✅ Available</option>
                <option value="false">❌ Borrowed</option>
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={onInputChange}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            )}
          </div>
        );
      })}
      <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
