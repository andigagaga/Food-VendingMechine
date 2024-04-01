import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import VendingMechinePage from "../pages/VendingMechinePage";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendingMechine" element={<VendingMechinePage/>}/>
      </Routes>
    </div>
  );
}
