import React, { useState, useEffect } from "react";
import { Select, List, message, Typography } from "antd";
import { db } from "./firebase"; // Import Firebase configuration
import { collection, getDocs } from "firebase/firestore";
// import "./moneyInputList.css";
import "tailwindcss/tailwind.css";

const { Option } = Select;
const { Title } = Typography;

const MoneyInputList = () => {
  const [moneyInputs, setMoneyInputs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (filter === "All") {
          const groomSnapshot = await getDocs(collection(db, "groom"));
          const brideSnapshot = await getDocs(collection(db, "bride"));

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

  const totalAmount = moneyInputs.reduce(
    (total, item) => total + parseFloat(item.amount || 0),
    0
  );

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <Title className="text-lg md:text-2xl mb-2 md:mb-0" level={3}>
          လက်ဖွဲ့ငွေစုစုပေါင်း - {totalAmount} ကျပ်
        </Title>
        <Select
          className="w-full md:w-1/3"
          defaultValue="All"
          onChange={handleFilterChange}
        >
          <Option value="All">အားလုံး</Option>
          <Option value="Groom">သတို့သား</Option>
          <Option value="Bride">သတို့သမီး</Option>
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
                    <p>ငွေပမာဏ: {item.amount} ကျပ်</p>
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
