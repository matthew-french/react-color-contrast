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

  const convertColor = hexCode => {
    const colorSet = convert.hex.lab(hexCode);
    let values = {}; //This is my issue!!!!
    Object.keys(_blankSet).map(Weight => {
      const l = _blankSet[Weight].lab[0];
      const getLab = [l, colorSet[1], colorSet[2]];
      const currentSet = {
        lab: getLab,
        rgb: convert.lab.rgb(getLab),
        hex: convert.lab.hex(getLab),
      };
      return (values[Weight] = currentSet);
    });
    return values;
  };

  const addColorSet = (colors, colorSet) => {
    const keys = Object.keys(colors);
    keys.push(colorSet);
    const values = convertColor(colorSet);
    const newColors = {};
    keys.map(key => {
      if (key === colorSet) {
        return (newColors[key] = values);
      } else {
        return (newColors[key] = colors[key]);
      }
    });
    console.log('injected as: ', newColors);
    return newColors;
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
        return {
          ...state,
          colors: addColorSet(state.colors, action.colorSet),
        };
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
