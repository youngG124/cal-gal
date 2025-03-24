import DayCell from "./DayCell.tsx";

function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
      <DayCell date="2025-03-24" />
      <DayCell date="2025-03-25" photoUrl="/images/0324_1.png" />
      <DayCell date="2025-03-26" photoUrl="/images/0324_2.png" />
    </div>
  );
}

export default App;