import React from "react"
import { useState, useEffect } from "react";
import axios from "axios";
import Student from "./components/Student";
function App() {
 
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ roll_num: "", name: "", city: "" });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/students/")
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/students/", formData)
            .then(response => setStudents([...students, response.data]))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <Student/>
            <h1>Student List</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.roll_num}>
                        {student.roll_num} - {student.name} - {student.city}
                    </li>
                ))}
            </ul>

            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="roll_num" placeholder="Roll Number" onChange={handleChange} required />
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" onChange={handleChange} required />
                <button type="submit">Add</button>
            </form>
        </div>
    );

  
}

export default App
