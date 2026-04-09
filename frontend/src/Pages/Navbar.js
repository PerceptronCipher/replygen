import reply from "../Images/reply.png";
// In Navbar.js
import { useRef } from "react";

function Navbar() {
  const fileInput = useRef(null);

  const handleUpload = () => {
    fileInput.current.click();
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={reply} />
      </div>
      <div className="nav-links">
        <a href="#main">Features</a>
        <a href="#how">How it Works</a>
        <a href="#paste">Documentation</a>
      </div>
      <div className="nav-btn">
        <button onClick={handleUpload}>Upload Docs</button>
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={(e) => console.log(e.target.files)}
        />
      </div>
    </div>
  );
}
export default Navbar;
