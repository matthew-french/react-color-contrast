import React from 'react';
import {StateProvider} from '../state';
import _DefaultColors from '../_defaultColors.json';
import _blankSet from '../_blankSet.json';
import Palette from './Palette';
import Input from './Input';
import Selected from './Atoms/Selected';
import convert from 'color-convert';

import '../styles.css';

export const App = () => {
  const initialState = {
    colors: _DefaultColors,
    selected: {
      Palette: '_defaultColor',
      Weight: 50,
      Values: {
        hex: 'FFF',
        rgb: [100, 100, 100],
        lab: [100, 0, 0],
      },
    },
  };
  const blankSet = _blankSet;

  const convertColor = hexCode => {
    let base = convert.hex.lab(hexCode);
    let values = Object.assign({}, blankSet);
    Object.keys(values).map(Weight => {
      let currentSet = values[Weight];
      currentSet.lab = [currentSet.lab[0], base[1], base[2]];
      currentSet.hex = convert.lab.hex(currentSet.lab);
      currentSet.rgb = convert.lab.rgb(currentSet.lab);
      return currentSet;
    });
    return values;
  };

  const removeColorSet = (colors, colorSet) => {
    const keys = Object.keys(colors);
    const newKeys = keys.reduce((prev, curr) => {
      if (curr !== colorSet) {
        prev.push(curr);
      }
      return prev;
    }, []);
    const newColors = {};
    newKeys.map(key => (newColors[key] = colors[key]));
    return newColors;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'selectSwatch':
        return {
          ...state,
          selected: {
            Palette: action.Palette,
            Weight: action.Weight,
            Values: action.values,
          },
        };
      case 'addSwatchShade':
        const newColorSet = {[action.color]: convertColor(action.color)};
        const colorState = state.colors;
        let combined = {...colorState, ...newColorSet};
        console.log('NewColor:', newColorSet, ' colorState:', colorState);
        console.log(combined);
        return {...state, colors: combined};
      case 'removeColorSet':
        return {
          ...state,
          colors: removeColorSet(state.colors, action.colorSet),
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <form>
        <Palette />
        <Input />
        <Selected />
      </form>
    </StateProvider>
  );
};
