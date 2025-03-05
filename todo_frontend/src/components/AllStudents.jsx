import React, { useState, useEffect } from "react";
import useStore from "../store/store";
import Card from "../../src/components/ui/Card";
import Button from "../../src/components/ui/Button";

function StudentList() {
  const { student, loading, error, fetchStudent, addStudent, deleteStudent, editStudent } = useStore();

  // Initialize state for new student
  const [roll_num, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if we're editing a student

  useEffect(() => {
    fetchStudent(); // Fetch student data on mount
  }, [fetchStudent]);

  // Handle deleting a student
  const handleDeleteStudent = async (roll_num) => {
    try {
      await deleteStudent(roll_num);
    } catch (err) {
      setErrorMessage("Failed to delete student. Please try again.");
    }
  };

  // Handle adding a new student
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

  // Handle editing a student (pre-filling the form with student data)
  const handleEditStudent = (roll_num) => {
    const studentToEdit = student.find((s) => s.roll_num === roll_num);
    if (studentToEdit) {
      setRollNumber(studentToEdit.roll_num);
      setName(studentToEdit.name);
      setCity(studentToEdit.city);
      setIsEditing(true); // Set editing mode
    }
  };

  // Handle saving an edited student
  const handleSaveEdit = async () => {
    if (!roll_num || !name || !city) {
      setErrorMessage("All fields are required.");
      return;
    }

    const updatedStudent = { roll_num, name, city };
    setErrorMessage(""); // Clear any previous error messages

    try {
      await editStudent(updatedStudent);
      setRollNumber(""); // Clear inputs after successful submission
      setName("");
      setCity("");
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      setErrorMessage("Failed to update student. Please try again.");
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
        <div className="container bg-gray-200 p-6 rounded-md shadow-md space-y-2 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-2 gap-3">
            {/* Display each student as a Card */}
            {student.map((s) => (
              <Card
                key={s.roll_num}
                className="w-[290px] text-black"
                title={s.name}
                description={`Roll No: ${s.roll_num}, City: ${s.city}`}
              >
                <span>
                  <Button
                    onClick={() => handleEditStudent(s.roll_num)}
                    className="mt-3 mr-2 !bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteStudent(s.roll_num)}
                    className="!bg-red-500 !hover:bg-red-700 !text-white"
                  >
                    Delete
                  </Button>
                </span>
              </Card>
            ))}
          </div>

          {/* Form to Add or Edit a Student */}
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
              onClick={isEditing ? handleSaveEdit : handleAddStudent}
              disabled={loading || !roll_num || !name || !city}
              className="w-full !bg-green-500 text-white px-4 py-2 rounded-md !hover:bg-green-600"
            >
              {isEditing ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
