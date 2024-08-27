// src/components/UserTable.js
import React, { useState } from "react";
import UserModal from "./UserModal";
import useFetch from "./useFetch";

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ key: "id", order: "asc" });
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, loading, error } = useFetch("https://dummyjson.com/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const filterUsers = (user) => {
    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.age.toString().includes(searchTerm) ||
      user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortedUsers = [...data.users].filter(filterUsers).sort((a, b) => {
    let comparison = 0;
    if (sort.order === "asc") {
      comparison = a[sort.key] > b[sort.key] ? 1 : -1;
    } else if (sort.order === "desc") {
      comparison = a[sort.key] < b[sort.key] ? 1 : -1;
    }
    return comparison;
  });

  const handleSort = (key) => {
    setSort((prevSort) => {
      if (prevSort.key === key) {
        return { key, order: prevSort.order === "asc" ? "desc" : "asc" };
      }
      return { key, order: "asc" };
    });
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["firstName", "age", "gender", "address"].map((header) => (
              <th
                key={header}
                onClick={() => handleSort(header)}
                style={{ cursor: "pointer", border: "1px solid black" }}
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => setSelectedUser(user)}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{`${user.address.city}, ${user.address.address}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserTable;
