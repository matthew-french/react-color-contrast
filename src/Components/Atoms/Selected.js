import React from "react";
import { useStateValue } from "../../state";

const Selected = () => {
  const [{ selected }] = useStateValue();
  const hex = selected.Values.hex;
  const rgb = selected.Values.rgb;
  return (
    <div className="SelectedInfo">
      <h2>Palette:</h2>
      <p>{selected.Palette}</p>
      <h3>Weight:</h3>
      <p>{selected.Weight}</p>
      <h3>Values</h3>
      <ul>
        <li>Hex: #{hex}</li>
        <li>rgb: {rgb.join(",")}</li>
      </ul>
    </div>
  );
};

export default Selected;
