import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = function (item) {
    // [ current items + new item ]
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = function (id) {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = function (id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = function () {
    const confirm = window.confirm(
      `Are you sure you want to delete all items?`
    );

    if (confirm) {
      setItems([]);
    }
  };

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
          onClearList={handleClearList}
        />
        <Stats items={items} />
      </div>
    </>
  );
}
