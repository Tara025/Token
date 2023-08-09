import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
      username: "",
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
  
      // Führe hier den API-Aufruf zum Login durch
      try {
        const response = await fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        if (response.status === 200) {
          // Erfolgreich eingeloggt, weiterleiten oder andere Aktionen durchführen
          navigate("/"); // Passe die Zielroute an
        } else {
          console.error("Login fehlgeschlagen");
        }
      } catch (error) {
        console.error("Fehler beim Login:", error);
      }
    };
  
    return (
      <>
        <form>
          <label>Username</label>
          <input
            value={user.username}
            onChange={(event) =>
              changeUserHandler("username", event.target.value)
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
          <button onClick={(event) => submitHandler(event)}>Login</button>
        </form>
      </>
    );
  }
  
  export default LoginUser;

