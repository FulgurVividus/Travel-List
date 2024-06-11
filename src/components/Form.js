import { useState } from "react";

// Form component
// in order to implement the "controlled elements" technique, we follow 3 steps
export default function Form({ onAddItems }) {
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

//! SOME NOTES
// In order to implement the "controlled elements" technique, we follow 3 steps:
// 1. create a piece of "state"
// 2. use this "state" on the element that we wanna control
// 3. we need to somehow connect the "state" with the "value", to update that "state variable" we do it with onChange={} handler
