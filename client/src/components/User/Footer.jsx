import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
