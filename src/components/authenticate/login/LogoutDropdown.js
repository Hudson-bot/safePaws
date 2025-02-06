import React, { useEffect, useRef } from "react";

const LogoutDropdown = ({ onLogout, onClose }) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="logout-dropdown" ref={dropdownRef}>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default LogoutDropdown;