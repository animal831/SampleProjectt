import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <h2>{user.name.firstname} {user.name.lastname}</h2>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Phone: {user.phone}</p>
              <h3>Address</h3>
              <p>Street: {user.address.street}, {user.address.number}</p>
              <p>City: {user.address.city}</p>
              <p>Zipcode: {user.address.zipcode}</p>
              <p>Geo: ({user.address.geolocation.lat}, {user.address.geolocation.long})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
