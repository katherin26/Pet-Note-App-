import React from "react";
import "./Footer.css";

export default function Footer(props) {
  let footerClasses =
    "flex justify-center fixed bottom-0 left-0 w-full p-6 text-white ";
  footerClasses += props.isPublicRoute ? "bg-transparent" : "bg-teal-600";
  return (
    <div className={footerClasses}>
      <div className="w-auto">
        <p>
          <strong>
            <i class="far fa-copyright"></i> <i class="fas fa-paw"></i>Pet-Note
          </strong>{" "}
          Created By <strong>Katherin Ochoa</strong> <strong>2020</strong>
        </p>
      </div>
    </div>
  );
}
