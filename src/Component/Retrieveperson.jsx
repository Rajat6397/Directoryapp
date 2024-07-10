// src/RetrievePerson.jsx
import  { useState } from 'react';

const RetrievePerson = () => {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setAadhar(e.target.value);
  };

  const handleRetrieve = () => {
    const persons = JSON.parse(localStorage.getItem('persons')) || [];
    const foundPerson = persons.find(p => p.aadhar === aadhar);
    if (foundPerson) {
      setPerson(foundPerson);
      setMessage('');
    } else {
      setPerson(null);
      setMessage('No match found');
    }
  };

  return (
    <div>
      <h2>Retrieve Information</h2>
      <input type="text" placeholder="Enter Aadhar Number" value={aadhar} onChange={handleChange} />
      <button onClick={handleRetrieve}>Retrieve</button>
      {person ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default RetrievePerson;
