import React from "react";
import ReactDOM from "react-dom";
import { App } from "./Components/App";

/*

Pseudo logic;

For each color given;
create a row of 10 radio buttons
  Values are those used in 'Selected' state,
    {
      origin: PaletteKey:String,
      weight: Weight:Number,
      values: {
        hex: String,
        rgb: [ Number, Number, Number],
        lab: [ Number, Number, Number],
        }
    }
  Labels are empty until a radio selected;
    Label of selected = Max contrast ratio;
    Label of o[n] = contrast ratio of n and selected
  
    Buttons enable
      Copy the RGB / RGBA / HEX value to clipboard
      Export a CSS file containing all values vanilla variables
      Export a Sketch palette file of all the values
        :root {
          --${given-color-name}--50 : rgb(255,255,255);
          {...}
          --${given-color-name}--900 : rgb(10,10,10);
        }

    Micro adjustments available to 'override' the init process
    Backetted at L +- 5% 
      50 = { L : 98 } // Bracket of 100 to 95;
      100 = { L : 90 } // Bracket of 85 to 95;
      {...}
      900 = { L : 10 } // Backet of 5 to 15;

*/

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
