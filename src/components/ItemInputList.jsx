import React, { useState, useEffect } from "react";
import { Select, List, message } from "antd";
import { db } from "./firebase"; // Import Firebase configuration
import { collection, getDocs } from "firebase/firestore";

const { Option } = Select;

const MoneyInputList = () => {
  const [moneyInputs, setMoneyInputs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (filter === "All") {
          const groomSnapshot = await getDocs(collection(db, "groom-item"));
          const brideSnapshot = await getDocs(collection(db, "bride-item"));

          const groomData = groomSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const brideData = brideSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          data = [...groomData, ...brideData];
        } else {
          const snapshot = await getDocs(collection(db, filter.toLowerCase()));
          data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
        setMoneyInputs(data);
      } catch (error) {
        message.error("Error fetching data: " + error.message);
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="p-5">
      <div className="mb-5 flex flex-col md:flex-row justify-between items-center">
        <Select
          defaultValue="All"
          className="w-full md:w-1/3 mt-3 md:mt-0"
          onChange={handleFilterChange}
        >
          <Option value="All">အားလုံး</Option>
          <Option value="Groom-item">သတို့သား</Option>
          <Option value="Bride-item">သတို့သမီး</Option>
        </Select>
      </div>
      <div className="max-h-96 overflow-y-scroll">
        <List
          bordered
          dataSource={moneyInputs}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                description={
                  <>
                    <p>အမည်: {item.name}</p>
                    <p>နေရပ်လိပ်စာ: {item.address}</p>
                    <p>အမျိုးအစား : {item.amount}</p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default MoneyInputList;
