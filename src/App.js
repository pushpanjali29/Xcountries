import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching data: {error.message}</h2>;
  }

  return (
    <div className="grid-container">
      {countries.map((country) => (
        <div className="country-box" key={country.name}>
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            className="flag"
          />
          <h3>{country.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default App