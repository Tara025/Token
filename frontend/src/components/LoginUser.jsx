import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    customerId: "",
    email: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

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
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        // Erfolgreich eingeloggt, weiterleiten oder andere Aktionen durchführen
        setLoginSuccess(true); // Setze den Zustand auf erfolgreich
        setTimeout(() => {
          navigate("/login"); // Passe die Zielroute an
        }, 3000);
      } else {
        console.error("Login fehlgeschlagen");
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <form>
        <label>Username</label>
        <input
          value={user.name}
          onChange={(event) => changeUserHandler("name", event.target.value)}
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
        <button className="auth-button" onClick={(event) => submitHandler(event)}>Login</button>
      </form>
      {loginSuccess && <p>Login erfolgreich!</p>}
    </div>
  );
}

export default LoginUser;
