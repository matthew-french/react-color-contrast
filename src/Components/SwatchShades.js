import React from 'react';
import {useStateValue} from '../state';
import Swatch from './Atoms/Swatch';
import {hex} from 'wcag-contrast';

const SwatchShades = props => {
  const [{colors, selected}, dispatch] = useStateValue();
  const Weights = Object.keys(colors[props.Palette]);
  return (
    <div className="SwatchShades">
      {Weights.map(value => {
        const Palette = props.Palette;
        let Weight = Number(value);
        let Contrast =
          Math.round(
            hex(colors[Palette][Weight].hex, selected.Values.hex) * 100
          ) / 100;
        let colorCodes = colors[Palette][Weight];
        let Values = {
          Palette: Palette,
          Weight: Weight,
          ...colorCodes,
        };
        return (
          <Swatch
            key={`${Palette}-${Weight}`}
            values={Values}
            contrast={Contrast}
          />
        );
      })}
      <button
        type="button"
        onClick={() =>
          dispatch({type: 'removeColorSet', colorSet: props.Palette})
        }>
        Delete Swatch
      </button>
    </div>
  );
};

export default SwatchShades;
