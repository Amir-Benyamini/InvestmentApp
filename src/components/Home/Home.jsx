import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export const Home = () => {
  const [name, setName] = useState("");

  const greet = (name) => {
    console.log(`Hello ${name}`);
  };
  return (
    //hero header - explain about the app and link to plan (later to monitor as well)
    //benfits or why to use this app section (headlin + 3 cards)
    //how to use this app section (procees bar or steps)
    //include background image and some graphics

    <div>
      <h1>Welcome to enWhealthy</h1>
      
    </div>
  );
};
