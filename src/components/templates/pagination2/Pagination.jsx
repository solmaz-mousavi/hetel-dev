import "./pagination.css";

function Pagination({
  dataLength,
  perPage,
	startIndex,
  setStartIndex,
}) {
	// ---- Create an array where the length corresponds to the number of pages
  const pages = Array.from(Array(Math.ceil(dataLength / perPage)).keys());
  return (
    <div className="pagination-container">
      {pages.map((item) => (
        <div
				key={item}
          className={`pagination-item ${startIndex === item * perPage ? "active" : ""}`}
          onClick={() => setStartIndex(item * perPage)}
        >
          {item + 1}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
