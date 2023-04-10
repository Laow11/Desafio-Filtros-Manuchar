import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navbar/navBar";
import s from "./Home.module.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    name: "asc",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [, setSelectedCompany] = useState("");
  const [, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    /*
      function getusers(){
        const response = axios.get("https://jsonplaceholder.typicode.com/users")
        const data = response.data
        return data

        getUsers()
      }*/
  }, []);

  // Searchbar
  function filterUsers(name) {
    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(name.toLowerCase());
    });
    if (!filtered.length) {
      // Validacion para que no quede en blanco al no coincidir el nombre
      return false;
    }
    setFilteredUsers(filtered);
  }

  // Filtro de la A hasta la Z
  function sortUsers(users) {
    // Recupero el ordenamiento actual de la columna.
    const order = sortOrder[users];
    //
    const sorted = sortedUsers.sort((a, b) => {
      if (a[users] < b[users]) return order === "asc" ? -1 : 1;
      if (a[users] > b[users]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortedUsers(sorted);
    setSortOrder({ ...sortOrder, [users]: order === "asc" ? "desc" : "asc" });
  }

  // Filtro por company
  function filterByCompany(company) {
    setSelectedCompany(company);
    const filtered = users.filter((user) => {
      return user.company.name.toLowerCase().includes(company.toLowerCase());
    });

    setFilteredUsers(filtered);
  }

  // Filtro por ciudad
  function filterByCity(city) {
    setSelectedCity(city);
    const filtered = users.filter((user) => {
      return user.address.city.toLowerCase().includes(city.toLowerCase());
    });

    setFilteredUsers(filtered);
  }

  return (
    <body>
      <div className={s.conteiner}>
        <NavBar />
        <select onChange={(e) => sortUsers(e.target.value)}>
          <option>Name</option>
          <option value="name">Z-A</option>
          <option value="name">A-Z</option>
        </select>
        <select onChange={(e) => filterByCompany(e.target.value)}>
          <option>Company</option>
          {users.map((user) => (
            <option key={user.company.name} value={user.company.name}>
              {user.company.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => filterByCity(e.target.value)}>
          <option>City</option>
          {users.map((user) => (
            <option key={user.address.city} value={user.address.city}>
              {user.address.city}
            </option>
          ))}
        </select>
        <input type="text" onChange={(e) => filterUsers(e.target.value)} />
        <table className={s.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Company</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </body>
  );
}
