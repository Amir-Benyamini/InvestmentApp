import axios from "axios";

export const keepHerokuAwake = async () => {axios.get("https://enwhealthy.herokuapp.com/")}