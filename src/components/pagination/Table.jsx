import React, { useState } from "react";
import { MdFastfood, MdErrorOutline } from "react-icons/md";
import { filterByID } from "../../filterMethods";
import { useGetFoodsQuery } from "../../app/services/foodApi";
import CircleSpinner from "../loader/CircleSpinner";

function Table({ title, body, actions }) {
  const {
    data: foods,
    isLoading: foodsIsLoading,
    error: foodsError,
  } = useGetFoodsQuery();

  if (foodsIsLoading) {
    return <CircleSpinner />;
  }
  if (foodsError) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{foodsError.error}</p>
      </div>
    );
  }
  {
    if (body.length === 0) {
      return <div className="errorBox">اطلاعاتی جهت نمایش وجود ندارد</div>;
    }
  }
  return (
    <div>
      <table className="table-container">
        <thead>
          <tr>
            {title.map((item) => (
              <th key={item} className="table-header">
                {item}
              </th>
            ))}
            {actions.length > 0 && <th className="table-header">&nbsp;</th>}
          </tr>
        </thead>

        <tbody>
          {body.map((row) => (
            <tr key={row.payload.id}>
              {row.tableData.map((item, index) => (
                <td key={row.payload.id + index} className="table-data">
                  <div className="table-data-box">{item}</div>
                </td>
              ))}
              {actions.length > 0 && (
                <td className="table-data">
                  <div className="table-action-container">
                    {actions.map((action, index) => (
                      <button
                        key={row.payload.id + "btn" + index}
                        className={`table-btn ${action.class}`}
                        title={action.tooltip}
                        onClick={() => {
                          action.method(row.payload);
                        }}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
