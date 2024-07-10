// src/AddPerson.jsx
import  { useState } from 'react';

const AddPerson = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    dob: '',
    aadhar: '',
    mobile: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });

    if (name === 'dob') {
      const age = calculateAge(value);
      setNewPerson({ ...newPerson, [name]: value, age });
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const addRow = () => {
    if (validateInput(newPerson)) {
      const updatedPersons = [...persons, newPerson];
      setPersons(updatedPersons);
      localStorage.setItem('persons', JSON.stringify(updatedPersons));
      setNewPerson({ name: '', dob: '', aadhar: '', mobile: '', age: '' });
    }
  };

  const saveRow = (index) => {
    if (validateInput(persons[index])) {
      const updatedPersons = [...persons];
      localStorage.setItem('persons', JSON.stringify(updatedPersons));
      alert('Person saved successfully!');
    }
  };

  const deleteRow = (index) => {
    const updatedPersons = [...persons];
    updatedPersons.splice(index, 1);
    setPersons(updatedPersons);
    localStorage.setItem('persons', JSON.stringify(updatedPersons));
  };

  const validateInput = (person) => {
    const { name, dob, aadhar, mobile} = person;
    if (!name || !dob || !aadhar || !mobile ) {
      alert('All fields are required!');
      return false;
    }
    if (aadhar.length !== 12 || isNaN(aadhar)) {
      alert('Aadhar Number must be 12 digits long.');
      return false;
    }
    if (mobile.length !== 10 || isNaN(mobile)) {
      alert('Mobile Number must be 10 digits long.');
      return false;
    }
    return true;
  };

  return (
    <div>
      <h2>Add New Person</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
              <td>
                <button onClick={() => saveRow(index)}>Save</button>
                <button onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><input type="text" name="name" value={newPerson.name} onChange={handleChange} /></td>
            <td><input type="date" name="dob" value={newPerson.dob} onChange={handleChange} /></td>
            <td><input type="text" name="aadhar" value={newPerson.aadhar} onChange={handleChange} /></td>
            <td><input type="text" name="mobile" value={newPerson.mobile} onChange={handleChange} /></td>
            <td>{newPerson.age}</td>
            <td>
              <button onClick={addRow}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddPerson;
