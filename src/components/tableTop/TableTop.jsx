import React from "react";
import "./tableTop.css";
import { useNavigate } from "react-router-dom";

function TableTop({ title, addRoute }) {
  const navigate = useNavigate();

  return (
    <div className="table-top">
      <h1 className="main-title">{title}</h1>
      <button
        type="button"
        className="btn btn-submit"
        onClick={() => navigate(`/aseman-hotel/${addRoute}`)}
      >
        جدید
      </button>
    </div>
  );
}

export default TableTop;
