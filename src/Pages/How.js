import star1 from "../Images/Star1.png";

function How() {
  return (
    <div className="how" id="how">
      <div className="howHeading">How it works</div>
      <div className="howList">
        <div className="hl">
          <img src={star1} />
          <li>Paste Email</li>
        </div>
        <div className="hl">
          <img src={star1} />
          <li>Get Instant Reply</li>
        </div>
        <div className="hl">
          <img src={star1} />
          <li>Ai Understands Context</li>
        </div>
      </div>
      <h2 className="use">Use Cases</h2>
      <div className="use-list">
        <li>Client communication</li>
        <li>Job applications</li>
        <li>Business follow-up</li>
        <li>Customer replies</li>
      </div>
    </div>
  );
}
export default How;
