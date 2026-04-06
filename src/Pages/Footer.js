import q from "../Images/reply.png";
import framei from "../Images/Frame21.png";
import frame2 from "../Images/Frame20.png";
import frame3 from "../Images/Frame19.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <div>
          <img src={q} alt="Q&A S" />
        </div>
        <div>
          <img src={framei} />
          <img src={frame2} />
          <img src={frame3} />
        </div>
      </div>

      <div className="footer-container">
        <h1>Quick Links</h1>
        <a href="#">Features</a>
        <a href="#">Contact</a>
        <a href="#">AI optimizer</a>
        <div>@ BuildON Inc. All rights reserve.</div>
      </div>
    </div>
  );
}

export default Footer;
