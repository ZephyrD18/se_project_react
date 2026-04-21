import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import tshirt from "../../assets/T-Shirt.svg";
import shorts from "../../assets/Shorts.svg";
import cap from "../../assets/Cap.svg";
import sneakers from "../../assets/Sneakers.svg";

function App() {
  const weatherData = {
    temp: { F: 75 },
    type: "hot",
  };

  const clothingItems = [
    {
      _id: 1,
      name: "T-Shirt",
      weather: "hot",
      imageUrl: tshirt,
    },
    {
      _id: 2,
      name: "Shorts",
      weather: "hot",
      imageUrl: shorts,
    },
    {
      _id: 3,
      name: "Cap",
      weather: "hot",
      imageUrl: cap,
    },
    {
      _id: 4,
      name: "Sneakers",
      weather: "hot",
      imageUrl: sneakers,
    },
  ];

  return (
    <div className="app">
      <Header />
      <Main weatherData={weatherData} clothingItems={clothingItems} />
    </div>
  );
}

export default App;
