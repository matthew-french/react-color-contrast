import React, {useRef} from 'react';
import {useStateValue} from '../../state';

const Swatch = props => {
  const [{selected}, dispatch] = useStateValue();
  const radioRef = useRef('');
  const key = `${props.values.Palette}-${props.values.Weight}`;
  const selectedKey = `${selected.Palette}-${selected.Weight}`;

  const handleChange = changeEvent => {
    dispatch({
      type: 'selectSwatch',
      Palette: props.values.Palette,
      Weight: props.values.Weight,
      Values: {...props.values.Values},
    });
  };

  return (
    <div
      className="radio"
      style={{backgroundColor: `#${props.values.Values.hex}`}}>
      <input
        type="radio"
        name="palette"
        id={key}
        ref={radioRef}
        checked={selectedKey === key}
        onChange={handleChange}
      />
      <label htmlFor={key}>
        {props.contrast ? props.contrast : `#${props.values.Values.hex}`}
      </label>
    </div>
  );
};

export default Swatch;
