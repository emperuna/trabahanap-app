import "../../styles/ScrollCards.css"; // Corrected path to the CSS file

const data = [
  { name: "Sophia Martinez", company: "Global Enterprises Ltd." },
  { name: "David Lee", company: "TechBridge Solutions" },
  { name: "Amira Hassan", company: "FinEdge Consulting" },
  { name: "Chen Wei", company: "BrightPath Logistics" },
  { name: "John Doe", company: "NextGen Startups" },
];

export default function ScrollCards() {
  return (
    <div className="scroll-container">
      {/* Row 1 - scroll left */}
      <div className="scroll-row left">
        {[...data, ...data].map((item, index) => (
          <div className="card" key={`row1-${index}`}>
            <div className="avatar"></div>
            <div>
              <p className="name">{item.name}</p>
              <p className="company">{item.company}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 - scroll right */}
      <div className="scroll-row right">
        {[...data, ...data].map((item, index) => (
          <div className="card" key={`row2-${index}`}>
            <div className="avatar"></div>
            <div>
              <p className="name">{item.name}</p>
              <p className="company">{item.company}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 3 - scroll left */}
      <div className="scroll-row left">
        {[...data, ...data].map((item, index) => (
          <div className="card" key={`row3-${index}`}>
            <div className="avatar"></div>
            <div>
              <p className="name">{item.name}</p>
              <p className="company">{item.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}