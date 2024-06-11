import { useState } from "react";

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

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
        />
        <Stats items={items} />
      </div>
    </>
  );
}

// Logo component
function Logo() {
  return (
    <>
      <h1>🏝️ Far Away 🧳</h1>
    </>
  );
}

// Form component
// in order to implement the "controlled elements" technique, we follow 3 steps
function Form({ onAddItems }) {
  // 1. create a piece of "state"
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = function (e) {
    e.preventDefault();

    // guard close
    if (!description) {
      return;
    }

    // object of new item
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    // cleaning OR setting the "states" back to their initial states
    setDescription("");
    setQuantity(1);
  };

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        {/* 2. use the "state" as the "value" of input field, use this "state" on the element that we wanna control */}
        <input
          type="text"
          placeholder="Item..."
          value={description}
          // 3. we need to somehow connect the "state" with the "value", to update that "state variable"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
}

// PackingList component
function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");

  // Sorting
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  // sorts in alphabetical order
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
              key={item.id}
            />
          ))}
        </ul>

        {/* Sorting */}
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
        </div>
      </div>
    </>
  );
}

// Item component
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </>
  );
}

// Stats component
function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 📝</em>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <>
      <footer className="stats">
        <em>
          {percentage === 100
            ? `You got everything! Ready to go ✈️`
            : `💼 You have ${numItems} items on your list, and you already packed
          ${numPacked} (${percentage}%)`}
        </em>
      </footer>
    </>
  );
}

//! SOME NOTES
// In order to implement the "controlled elements" technique, we follow 3 steps:
// 1. create a piece of "state"
// 2. use this "state" on the element that we wanna control
// 3. we need to somehow connect the "state" with the "value", to update that "state variable" we do it with onChange={} handler
