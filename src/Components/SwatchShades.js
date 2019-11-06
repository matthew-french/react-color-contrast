import React from 'react';
import {useStateValue} from '../state';
import Swatch from './Atoms/Swatch';
import {hex} from 'wcag-contrast';

const SwatchShades = props => {
  const [{colors, selected}, dispatch] = useStateValue();
  const Weights = Object.keys(colors[props.Palette]);
  return (
    <>
      {Weights.map(value => {
        const Palette = props.Palette;
        const Weight = Number(value);
        let colorHex = colors[Palette][Weight].hex;
        let Contrast =
          Math.round(hex(colorHex, selected.Values.hex) * 100) / 100;
        const selectedContrast = selected.MaxContrast;

        if (
          props.Palette === selected.Palette &&
          props.Weight === selected.Weight
        ) {
          return selected.MaxContrast;
        }
        let colorCodes = colors[Palette][Weight];
        let Values = {
          Palette: Palette,
          Weight: Weight,
          Values: {...colorCodes},
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
    </>
  );
};

export default SwatchShades;
