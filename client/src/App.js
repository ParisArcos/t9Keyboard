import { Routes, Route } from "react-router-dom";
import MainLayaout from "./layouts/MainLayaout";
import TNinePanel from "./pages/TNinePanel";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayaout />}>
        <Route index element={<TNinePanel />} />
      </Route>
    </Routes>
  );
}

export default App;
