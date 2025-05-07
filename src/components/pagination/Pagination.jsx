import React, { useState } from "react";
import { CiViewColumn, CiViewTable, CiGrid41 } from "react-icons/ci";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import Table from "./Table";
import RowGridView from "./RowGridView";
import "./pagination.css";

export default function Pagination({
  body,
  title,
  actions,
  photoes,
  onlyTable,
}) {
  let defaultView = "grid";
  if (onlyTable) {
    defaultView = "table";
  }
  const [view, setView] = useState(defaultView);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const endIndex = page * limit;
  const startIndex = endIndex - limit;
  const data = body.slice();
  const paginatedData = data.slice(startIndex, endIndex);
  let paginatedPhotoes = [];
  if (photoes) {
    paginatedPhotoes = photoes.slice(startIndex, endIndex);
  }
  const pageNumbers = Array.from(Array(Math.ceil(body.length / limit)).keys());

  const setPageNum = (event) => {
    setPage(Number(event.target.innerHTML));
  };

  return (
    <>
      <div className="view-filter-wrapper">
        <div className="view-filter-container container">
          {!onlyTable && (
            <div className="view-container">
              <CiViewTable
                className="view-item"
                title="نمایش جدولی"
                onClick={() => setView("table")}
              />
              <CiViewColumn
                className="view-item"
                title="نمایش افقی"
                onClick={() => setView("row")}
              />
              <CiGrid41
                className="view-item"
                title="نمایش برگه ای"
                onClick={() => setView("grid")}
              />
            </div>
          )}
          <div className="table-filter">
            <span>تعداد آیتم در هر صفحه: </span>
            <div className="counter-wrapper">
              <button
                onClick={() => setLimit((prev) => prev + 1)}
                disabled={limit >= 10}
              >
                <CiSquarePlus />
              </button>
              <span>{limit}</span>
              <button
                onClick={() => setLimit((prev) => prev - 1)}
                disabled={limit <= 1}
              >
                <CiSquareMinus />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="view-wrapper container">
        {view === "table" ? (
          <div className="table-controller">
            <Table title={title} body={paginatedData} actions={actions} />
          </div>
        ) : (
          <RowGridView
            title={title}
            body={paginatedData}
            actions={actions}
            photoes={paginatedPhotoes}
            view={view}
          />
        )}
      </div>

      <div className="pagination-container">
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`pageNumber ${pageNumber + 1 === page ? "active" : ""}`}
            onClick={(event) => setPageNum(event)}
          >
            {pageNumber + 1}
          </div>
        ))}
      </div>
    </>
  );
}
