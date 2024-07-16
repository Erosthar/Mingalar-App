import { useState, useEffect } from "react";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import { Button, Input, Modal, message } from "antd";
import { db } from "./firebase"; // Import the initialized Firestore instance
import { collection, addDoc } from "firebase/firestore";
import "./moneyInput.css";

const MoneyInput = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [currentType, setCurrentType] = useState("");

  const handleSave = async () => {
    if (!name || !address || !amount) {
      message.warning("စာအရင်ရိုက်ထည့်ပါ");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, currentType), {
        name,
        address,
        amount,
      });
      message.success("လက်ဖွဲ့ငွေထည့်သွင်းပြီးပါပြီ !");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      message.error("Error adding document: " + e.message);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      setName("");
      setAddress("");
      setAmount("");
    }
  }, [isVisible]);

  return (
    <div className="main">
      <div className="Money-Input-container">
        <div className="button-group">
          {/* Groom Button */}
          <Button
            icon={<ManOutlined />}
            type="primary"
            className="button"
            onClick={() => {
              setCurrentType("groom");
              setIsVisible(true);
            }}
          >
            <span>သတို့သား</span>
          </Button>

          {/* Bride Button */}
          <Button
            type="primary"
            icon={<WomanOutlined />}
            className="button"
            onClick={() => {
              setCurrentType("bride");
              setIsVisible(true);
            }}
          >
            <span>သတို့သမီး</span>
          </Button>
        </div>

        {/* Modal */}
        <Modal
          visible={isVisible}
          title="လက်ဖွဲ့ငွေထည့်သွင်းရန်"
          onCancel={() => setIsVisible(false)}
          footer={[
            <Button key="back" onClick={() => setIsVisible(false)}>
              နောက်သို့
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleSave}
              style={{ color: "black" }}
            >
              သိမ်းပါ
            </Button>,
          ]}
        >
          <Input
            placeholder="အမည်"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <Input
            placeholder="နေရပ်လိပ်စာ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input"
          />
          <Input
            placeholder="ငွေပမာဏ"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
            className="input"
            type="number"
          />
        </Modal>
      </div>
    </div>
  );
};

export default MoneyInput;
