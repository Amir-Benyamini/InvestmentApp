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
    <div>
      <h1>Bar Home Page</h1>
      <TextField
        name="name"
        type="text"
        label="Privet Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          greet(name);
        }}
      >
        click me and i will console log
      </Button>
    </div>
  );
};
