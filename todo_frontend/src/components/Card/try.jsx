import React, { useState, useEffect } from "react";
import useStore from "../../store/store"; // Assuming useStore is a custom hook to handle student data
import Card from "../ui/Card"; // Path to your Card component

function New() {
  const { student, loading, error, fetchStudent, addStudent } = useStore();

  // Initialize state for new student
  const [roll_num, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchStudent(); // Fetch student data on mount
  }, [fetchStudent]);

  const handleAddStudent = async () => {
    if (!roll_num || !name || !city) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newStudent = { roll_num, name, city };
    setErrorMessage(""); // Clear any previous error messages

    try {
      await addStudent(newStudent); // Add new student to the store
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
    <div className="h-screen bg-gray-700 p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-white">Student List</h1>

      <div className="flex justify-center items-center bg-gray-700 p-6">
        <div className="container bg-gray-200 p-6 rounded-md shadow-md space-y-4 w-full">
          <div className="grid grid-cols-3 gap-4">
            {/* Display each student as a Card */}
            {student.map((s) => (
              <Card
                key={s.roll_num}
                className="w-[200px] text-black"
                title={s.name} // Student name as card title
                description={`Roll No: ${s.roll_num}, City: ${s.city}`}
              >
                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  View Details
                </button>
              </Card>
            ))}
          </div>

          {/* Form to Add a New Student */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          
          <div className="mt-6 space-y-4">
            <input
              type="number"
              placeholder="Roll Number"
              value={roll_num}
              onChange={handleRChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={handleCityChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddStudent}
              disabled={loading}
              className="w-full !bg-green-500 text-white px-4 py-2 rounded-md !hover:bg-green-600"
            >
              Add Student
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
