import axios from "axios";
import { useEffect, useState } from "react";

export default function FetchApi() {
  const [setErrorMsg] = useState("");

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=apples`
      );
      console.log(response.data.data);
    } catch (e) {
      const error = e instanceof Error ? e.message : "Could not fetch data!";
      setErrorMsg(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
}
