import React from 'react';
import {useStateValue} from '../state';
import SwatchShades from './SwatchShades';

const Palette = () => {
  const [{colors}] = useStateValue();
  const PaletteKeys = Object.keys(colors);
  return (
    <div className="palette">
      {PaletteKeys.map(value => (
        <SwatchShades key={value} Palette={value} />
      ))}
    </div>
  );
};

export default Palette;
