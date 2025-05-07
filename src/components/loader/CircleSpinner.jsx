import React from "react";
import { MdOutlineDownloading } from "react-icons/md";

export default function CircleSpinner() {
  return (
    <div className="loader-container">
      <div className="loader">
        <MdOutlineDownloading />
        <p dir="ltr">Loading ...</p>
      </div>
    </div>
  );
}
