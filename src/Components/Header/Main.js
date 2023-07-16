import styles from "./main.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
const API_link = "https://api.punkapi.com/v2/beers/";
const Main = () => {
  const [beerList, setBeerList] = useState([[]]);
  const getBeerApi = async () => {
    try {
      const resp = await axios.get(API_link);
      setBeerList(resp.data);
    } catch (error) {
      console.error(`Error fetching beer data: ${error}`);
    }
  };
  useEffect(() => {
    getBeerApi();
  }, []);
  const handleSearch = async (e) => {
    // console.log(e.target.value);
    try {
      if (e.target.value === "") {
        const resp = await axios.get(`${API_link}`);
        setBeerList(resp.data);
      } else {
        const resp = await axios.get(`${API_link}?beer_name=${e.target.value}`);
        setBeerList(resp.data);
      }
    } catch (error) {
      console.error("Error getting beer list: " + error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.main_header}>
        <h2>Punk API using Axios</h2>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.input}
            onChange={handleSearch}
            placeholder={"Enter beer...."}
          />
        </div>
      </div>
      {/*<button onClick={getBeerApi}>Press to get beer data</button>*/}
      <div className={styles.beers}>
        {beerList.length >= 1 ? (
          beerList.map((beer) => {
            const { id, name, image_url, tagline, first_brewed } = beer;
            const imgName = image_url ? image_url.split("/").pop() : "";
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
    </div>
  );
};

export default Main;
