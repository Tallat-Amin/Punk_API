import styles from "./main.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
const inputSearch = document.querySelector("input");
// (e.target.value = inputSearch.value ? console.log(e.target.value) : ""),

const Main = () => {
  const [beerList, setBeerList] = useState([[]]);
  const [inputText, setInputText] = useState("");
  // inputSearch.addEventListener("input", (e) => {
  //   setInputText(e.target.value);
  // });
  const getBeerApi = async () => {
    const resp = await axios.get(`https://api.punkapi.com/v2/beers/`);
    setBeerList(resp.data);
  };
  const fetchBeerData = async () => {
    const resp = await axios.get(
      `https://api.punkapi.com/v2/beers?beer_name=${inputText}`,
    );
    setBeerList(resp.data);
  };
  useEffect(() => {
    getBeerApi();
  });
  // useEffect(() => {
  //   fetchBeerData();
  // });
  // const filterBeer = async () => {
  //   const beerName =
  //   const resp = await axios.get(
  //     `https://api.punkapi.com/v2/beers?beer_name=${beerName}`,
  //   );
  // };
  return (
    <div className={styles.main}>
      <>
        <div className={styles.main_header}>
          <h2>Punk API using Axios</h2>
          <div className={styles.search}>
            <input
              type="text"
              className={styles.input}
              placeholder={"Enter beer...."}
            />
          </div>
        </div>
        {/*<button onClick={getBeerApi}>Press to get beer data</button>*/}
        <div className={styles.beers}>
          {beerList.length >= 1 ? (
            beerList.map((beer, index) => {
              const { id, name, image_url, tagline, first_brewed } = beer;
              const imgName = image_url ? image_url.split("/").pop() : "";
              // console.log(imgName);
              return (
                <div id={id}>
                  <h3>{name}</h3>
                  <img src={image_url} alt={imgName} height={100} width={45} />
                  <h4>{tagline}</h4>
                  <p>{first_brewed}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </>
    </div>
  );
};

export default Main;
