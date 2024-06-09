export default function App() {
  return (
    <>
      <div className="app">
        <Logo />
        <Form />
        <PackingList />
        <Stats />
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
function Form() {
  return (
    <>
      <div className="add-form">What do you need for your 😍 trip?</div>
    </>
  );
}

// PackingList component
function PackingList() {
  return (
    <>
      <div className="list">LIST</div>
    </>
  );
}

// Stats component
function Stats() {
  return (
    <>
      <footer className="stats">
        <em>💼 You have X items on your list, and you already packed X (X%)</em>
      </footer>
    </>
  );
}
