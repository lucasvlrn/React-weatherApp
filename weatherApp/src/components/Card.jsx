import { Building, Cloud, Droplets, Thermometer } from "lucide-react";
import React, { useState } from "react";

function Card() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [name, setName] = useState(null);
  const [hum, setHum] = useState(null);
  const [clouds, setCloud] = useState(null);

  async function getAPI(e) {
    e.preventDefault();
    const key = "33d8170891bf230e1b2187fcf6b1385a";
    if (!city) {
      console.error("campo obrigatorio");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=Metric`;
    let response = await fetch(url);
    var jsonConvert = await response.json();

    let temperature = Math.round(jsonConvert.main.temp);
    setTemp(temperature);
    let humidity = jsonConvert.main.humidity;
    setHum(humidity);
    let cidade = jsonConvert.name;
    setName(cidade);
    let cloud = jsonConvert.weather[0].description;
    setCloud(cloud);
    setCity("");
  }

  return (
    <div className="w-screen bg-sky-950 h-screen font-sans">
      <div className="h-fit w-96 border-2 border-white rounded flex flex-col items-center justify-center gap-8 p-6">
        <h2 className="text-2xl text text-white/90">
          Consulte uma cidade abaixo
        </h2>
        <div className="flex items-center justify-center flex-col gap-6">
          <div>
            <Thermometer size={52} stroke="#fff" />
            <h1 className="text-5xl text-white font-medium mb-2">
              {temp !== null ? temp + "°C" : ""}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <Building size={32} stroke="#fff" />
            <p className="text-white">{name !== null ? name : ""}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <input
            className="w-72 rounded outline-none bg-transparent border-2 border-white p-1  text-white"
            type="text"
            name=""
            id=""
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="transition bg-transparent ease-in-out delay-150 border-2 border-sky-800 rounded w-32 h-7
           hover:bg-sky-900 hover:border-sky-900 text-white"
            onClick={getAPI}
          >
            Consultar
          </button>
        </div>
        <div className="w-full flex flex-col gap-3 items-start justify-start text-white/90">
          <div className="flex flex-row gap-2 justify-start">
            <Droplets /> {hum !== null ? hum + "%" : ""}
          </div>
          <div className="flex flex-row gap-2">
            <Cloud /> {clouds !== null ? clouds : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
