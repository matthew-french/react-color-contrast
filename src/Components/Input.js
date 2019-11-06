import React, {useRef} from 'react';
import {useStateValue} from '../state';

const Input = () => {
  const [{colors}, dispatch] = useStateValue();

  const input = useRef('');

  return (
    <>
      <label htmlFor="hexcode">Hex Value: #</label>
      <input id="hexcode" type="text" placeholder="hex value" ref={input} />
      <button
        type="button"
        onClick={() => {
          dispatch({type: 'addSwatchShade', colorSet: input.current.value});
          input.current.value = '';
        }}>
        Add New Swatch
      </button>
    </>
  );
};

export default Input;
