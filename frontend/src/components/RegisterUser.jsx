import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function RegisterUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeUserHandler = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Führe hier den API-Aufruf zur Registrierung durch
    try {
    const response = await fetch("http://localhost:4000/api/user/register",  {
        method: "POST",
        // credentials: "same-origin", //include
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        
      });
     console.log (response)

      if (response.status === 201) {
        // Erfolgreich registriert, weiterleiten oder andere Aktionen durchführen
        navigate("/"); // Passe die Zielroute an
      } else {
        console.error("Registrierung fehlgeschlagen");
      }
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
    }
  };

  return (
    <>
      <form>
        <label>name</label>
        <input
          value={user.name}
          onChange={(event) =>
            changeUserHandler("name", event.target.value)
          }
        />
        <label>Email</label>
        <input
          value={user.email}
          onChange={(event) => changeUserHandler("email", event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(event) =>
            changeUserHandler("password", event.target.value)
          }
        />
        <button onClick={(event) => submitHandler(event)}>Register</button>
      </form>
    </>
  );
}

export default RegisterUser;
