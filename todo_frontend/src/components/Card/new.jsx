import React, { useState, useEffect } from "react";
import useStore from "./store/store";
import AllStudents from "../src/components/AllStudents"
function App() {
  const { student, loading, error, fetchStudent, addStudent } = useStore();
  
  // Initialize roll_num state
  const [roll_num, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handleAddStudent = async () => {
    if (!roll_num || !name || !city) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newStudent = { roll_num, name, city };
    setErrorMessage(""); // Clear any previous error messages

    try {
      await addStudent(newStudent);
      setRollNumber(""); // Clear inputs after successful submission
      setName("");
      setCity("");
    } catch (err) {
      setErrorMessage("Failed to add student. Please try again.");
    }
  };

  const handleRChange = (e) => setRollNumber(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* <AllStudents/> */}
      <h1>Students List</h1>
      <ul>
        {student.map((s) => (
          <li key={s.roll_num}>{s.name}</li>
        ))}
      </ul>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <input
        type="number"
        placeholder="Roll Number"
        value={roll_num}
        onChange={handleRChange}
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={handleCityChange}
      />

      <button onClick={handleAddStudent} disabled={loading}>
        Add Student
      </button>
    </div>
  );
}

export default App;
