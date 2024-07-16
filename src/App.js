import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import Setting from "./components/Setting";
import Home from "./components/Home";
import MoneyInput from "./components/MoneyInput";
import MoneyInputList from "./components/MoneyInputList";
import ItemInput from "./components/ItemInput";
import ItemInputList from "./components/ItemInputList";
import ContactUs from "./components/ContactUs";

// import "./App.css";

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <section className="flex gap-6">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="m-3 text-xl text-gray-900 font-semibold flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/moneyInput" element={<MoneyInput />} />
            <Route path="/moneyInputList" element={<MoneyInputList />} />
            <Route path="/itemInput" element={<ItemInput />} />
            <Route path="/itemInputList" element={<ItemInputList />} />
            <Route path="/contactUs" element={<ContactUs />} />
            {/* <Route path="/setting" element={<Setting />} /> */}
          </Routes>
        </div>
      </section>
    </>
  );
};

export default App;
