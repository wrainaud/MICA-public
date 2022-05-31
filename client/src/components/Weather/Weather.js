import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import DisplayWeather from "../../pages/WeatherDisplay/DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    state:"",
  });

  async function weatherData(e) {
    e.preventDefault();
    if (form.city ==! "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.state},&APPID=${process.env.REACT_APP_OWAPIKEY}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
     if (name == "state") {
      setForm({ ...form, state: value });
    }
  };
  return (
    <div id="weatherMainHolder">
    <div className="weather ">
      <h3 className="title">Enter a City & State </h3>
      <br />
      <form>
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="state"
          name="state"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <div/>
        <Button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </Button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
    </div>
  );
}

export default Weather;