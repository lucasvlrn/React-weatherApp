import { useState } from "react";
import "./App.css";
import Card from "./components/Card.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Card />
    </div>
  );
}

export default App;
