import React from 'react';

const Swatch = props => {
  const key = `${props.values.Palette}-${props.values.Weight}`;

  return (
    <div className="radio" style={{backgroundColor: `#${props.values.hex}`}}>
      <input type="radio" name="palette" id={key} />
      <label htmlFor={key}>
        {props.contrast ? props.contrast : `#${props.values.hex}`}
      </label>
    </div>
  );
};

export default Swatch;
