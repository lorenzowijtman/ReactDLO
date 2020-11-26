import React from 'react'
import _ from 'lodash';

const colors = ['#00A3DA', '#812C7C', '#009949', '#D8232A', '#D8127D'];

export const randomColorWord = (string) => {
  if (string.length === 0 || typeof string !== 'string') {
    return string;
  }

  let shuffledColors = _.shuffle(colors);
  const letters = string.split('');

  const result = letters.map((letter, index) => {
    if (shuffledColors.length === 0) {
      
      shuffledColors = _.shuffle(colors);
    }

    const chosenColor = shuffledColors[0];
    shuffledColors.splice(0, 1);

    console.log(chosenColor);
    console.log(shuffledColors);

    return (
        <span key={index} style={{ color: chosenColor }}>{letter}</span>
    );
  });

  return (
      <span>
        {result.map(result => result)}
      </span>
  );
};

export const randomColor = (colorArray) => {
  const array = colorArray || colors;
  let shuffledColors = _.shuffle(array);
  return shuffledColors[0];
}
