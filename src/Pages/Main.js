function Main() {
  return (
    <div className="main" id="main">
      <h1>Write perfect email replies in seconds</h1>
      <p>
        Paste any email and get smart, professional response instantly clear,
        concise and on point
      </p>
      <div className="main-btn">
        <button
          className="b1"
          onClick={() =>
            document
              .getElementById("paste")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Generate Reply
        </button>

        <button
          className="b2"
          onClick={() =>
            document
              .getElementById("paste")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Ask AI
        </button>
      </div>
      <div className="howline"></div>
    </div>
  );
}
export default Main;
