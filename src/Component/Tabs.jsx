// src/Tabs.js
import  { useState } from 'react';
import AddPerson from "../Component/Addperson.jsx";
import RetrievePerson from "../Component/Retrieveperson.jsx"

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('add')}>Add New Person</button>
        <button onClick={() => setActiveTab('retrieve')}>Retrieve Information</button>
      </div>
      <div>
        {activeTab === 'add' && <AddPerson />}
        {activeTab === 'retrieve' && <RetrievePerson />}
      </div>
    </div>
  );
};

export default Tabs;
