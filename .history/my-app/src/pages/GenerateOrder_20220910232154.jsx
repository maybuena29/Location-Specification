import React, { useState, useEffect, useCallback, useRef } from "react";
import { Header } from "../components";
import { Table, Input, Modal, InputNumber, Button } from "antd";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";


const { Search } = Input;

const GenerateOrder = () => {
  const [InventorySelectionTable, setInventorySelectionTable] = useState([]);
  const [quantityModalVisibility, setQuantityModalVisibility] = useState(false);
  const [cart, addToCart] = useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});


  const fetchInventoryItems = async () => {
    const { data } = await Axios.get("http://localhost:3001/api/inventory/get");
    setInventorySelectionTable(data);
  };
  useEffect(() => {
    //on page load
    fetchInventoryItems();
  }, []);
  
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);

  const selectionColumns = [
    {
      title: "productSKU",
      dataIndex: "productSKU",
      defaultSortOrder: "descend",
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        return (
          <p
            style={{
              color: record.productStatus === "active" ? "green" : "red",
              textTransform: "capitalize",
            }}
            className="font-semibold"
          >
            {text}
          </p>
        );
      },
    },
    {
      dataIndex: "productName",
      title: "Product Name",
      align: "Center",
      width: "150",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "productPrice",
      title: "Price",
      width: "200",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>₱{text}</p>;
      },
    },
    {
      dataIndex: "TransacSoldQty",
      title: "Sold Qty",
      width: "200",
      align: "Center",
      render: (text, record, index) => {
        return <p style={{ textTransform: "capitalize" }}>{`${record.quantity} x ${record.productPrice}₱`}</p>;
      },
    },
    {
      dataIndex: "action",
      title: "",
      width: "200",
      align: "Center",
      render: (text, record) => {
        return (
        //   <Button type="button" className="bg-red text-white" onClick={()=> record.}> Delete
        // </Button>
        )
      },
    },
  ];
  const invselectionColumns = [
    {
      title: "productSKU",
      dataIndex: "productSKU",
      defaultSortOrder: "descend",
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        return (
          <p
            style={{
              color: record.productStatus === "active" ? "green" : "red",
              textTransform: "capitalize",
            }}
            className="font-semibold"
          >
            {text}
          </p>
        );
      },
    },
    {
      dataIndex: "productName",
      title: "Product Name",
      align: "Center",
      width: "150",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "inventoryQuantity",
      title: "Quantity",
      align: "Center",
      width: "150",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "productPrice",
      title: "Price",
      width: "200",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>₱{text}</p>;
      },
    },
  ];
  const onCancelQuantityModal = (e) => {
    setQuantityModalVisibility(false);
  };
  const proceedCallback = (item) => {
    addToCart([...cart, item]);
    setQuantityModalVisibility(false);
  };
  return (
    <div className="md:m-10 mt-20 mx-8">
      <Header title="Generate Orders" />
      <InputQuantityModal
        visible={quantityModalVisibility}
        close={onCancelQuantityModal}
        item={currentSelectedItem}
        min={1}
        max={currentSelectedItem.inventoryQuantity}
        proceedCallback={proceedCallback}
      />
      <div className="m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md">
        <div className="flex w-full h-12 mt-2">
          <p className="my-auto w-auto sm:w-34 md:w-72 px-4 font-bold">
            Transaction
          </p>
        </div>
        <div
          style={{ borderColor: "#747C95" }}
          className=" w-full my-5 border-b-2 rounded"
        ></div>

        <form>
          <div className="flex flex-col md:flex-row w-full min-w-screen justify-center items-center">
            <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
              <div>
                <Table
                  columns={selectionColumns}
                  dataSource={cart}
                  pagination={false}
                  rowKey="cartId"
                ></Table>
              </div>
              <div>
                <p className="text-lg ml-5 font-semibold">Total: {
                     cart.reduce((sum, item)=>{
                      return sum + (item.quantity * item.productPrice)
                    }, 0)
                  }</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
              <div className="relative  w-1/2 ">
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  //onSearch={onSearch}
                />
              </div>

              <div>
                <Table
                  height={1000}
                  onRow={(record) => ({
                    onClick:() => {
                      setQuantityModalVisibility(true);
                      setCurrentSelectedItem(record);
                    },
                  })}
                  columns={invselectionColumns}
                  dataSource={InventorySelectionTable}
                  rowKey="inventoryID"
                  rowClassName="cursor-pointer"
                ></Table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputQuantityModal = ({ visible, close, item, proceedCallback, min, max }) => {
  const [inputValue, setInputValue] = useState(1);
  const [error, setError] = useState("");
  const inputRef = useRef()
  const submitInput = useCallback(() => {
    if (inputValue < min) {
      setError(`Value should be atleast ${min}`);
      return;
    }
    if (inputValue > max) {
      setError(`Value should not exceed ${max}`);
      return;
    }
    const itemWithQuantity = {
      ...item,
      quantity: inputValue,
      cartId: uuidv4(),
    };
    proceedCallback(itemWithQuantity);
  }, [visible, inputValue]);

  
  const listenForKeyPress = useCallback(
    (event) => {
      switch(event.code){
        case "Enter":
          submitInput();
          break;
        case "ControlLeft": 
          inputRef.current.focus()
          break
        default:
          console.log("key not registered")
      }
    },
    [visible, inputValue]
  );
  
  useEffect(() => {
    if (visible) {
      window.addEventListener("keydown", listenForKeyPress, true);
    } else {
      setInputValue(1);
      setError("");
      window.removeEventListener("keydown", listenForKeyPress, true);
    }
    return () => {
      window.removeEventListener("keydown", listenForKeyPress, true); // clean up func to avoid memory leaks
    };
  }, [visible, listenForKeyPress, submitInput]);

  const onInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <Modal
      title={item.productName}
      open={visible}
      onCancel={close}
      centered
      width={300}
      footer={null}
    >
      <div className="flex flex-col w-full min-w-screen justify-between items-center">
        <div className="flex flex-col gap-4 justify-center w-full md:w-10/12 p-0 sm:w-full h-16">
          <div className="textboxes w-full flex flex-col justify-center h-9">
            {/* <label className='font-display w-32 block' htmlFor=''>Quantity</label> */}
            <small className="text-red-400">{error}</small>
            <InputNumber
              className="w-full"
              placeholder="Enter quantity"
              value={inputValue}
              ref={inputRef}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="flex gap-1">
          <Button type="button" className="bg-red text-white">
            Cancel(ESC)
          </Button>
          <Button type="button" className="bg-blue-400 text-white" onClick={submitInput}>
            Proceed(Enter)
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const VoidItemModal = ()=>{

}
export default GenerateOrder;
