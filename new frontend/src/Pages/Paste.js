import { useState } from "react";

function Paste() {
  const [emailText, setEmailText] = useState("");
  const [contextText, setContextText] = useState(""); // optional for future use
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("short"); // for future backend support
  const [intent, setIntent] = useState("Accept"); // optional
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!emailText.trim()) {
      alert("Please paste an email first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://replygen-1.onrender.com/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_content: emailText,
            context: contextText,
            tone: tone.toLowerCase(),
            length: length.toLowerCase(),
            intent: intent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate reply");
      }

      const data = await response.json();

      // Get only the selected tone
      const replyForTone = data.replies[tone.toLowerCase()];
      setGeneratedReply(replyForTone || "No reply generated");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paste">
      <h1>Paste your email here</h1>
      <textarea
        className="t2"
        placeholder="Paste your email here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      ></textarea>

      <p className="q">Quick option</p>
      <div className="dropdown-container">
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
          <option value="assertive">Assertive</option>
        </select>

        <select value={length} onChange={(e) => setLength(e.target.value)}>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>

        <select value={intent} onChange={(e) => setIntent(e.target.value)}>
          <option value="Accept">Accept</option>
          <option value="Decline">Decline</option>
          <option value="Request clarification">Request clarification</option>
          <option value="Follow Up">Follow Up</option>
        </select>
      </div>

      <div>
        <button className="b3" onClick={handleGenerate}>
          {loading ? "Generating..." : "Generate Reply"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <div className="box1">
        <h2>Generate reply</h2>
        <textarea
          className="t1"
          placeholder={`Hi [Name],
Thank you for your email. I appreciate you reaching out regarding...
I’d be happy to move forward with this...
Best regards,
[Your Name]`}
          value={generatedReply}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default Paste;
