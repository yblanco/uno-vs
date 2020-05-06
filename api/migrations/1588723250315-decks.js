const Decks = require('../models/deck.model');


const { cards, colors, decks } = require('../constants');
const [normal] = decks;
const [number, draw, skip, reverse, wild] = cards;
const  [neutral, green, yellow, red, blue] = colors;

async function up () {
  return this('decks').insertMany( [blue, green, red, yellow].reduce((partial, current) => {
    const colorcards = [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9]
    const colorwilds = [skip, skip, reverse, reverse];
    const colordraws = [2, 2];
    return partial
      .concat(colorcards.map(colorcard => ({ type: number, finish: true, info: { color: current, number: colorcard }})))
      .concat(colorwilds.map(colorwild => ({ type: colorwild, info: { color: current }})))
      .concat(colordraws.map(colordraw => ({ type: draw, info: { color: current, number: colordraw }})))
  }, []).concat([neutral, neutral, neutral, neutral].reduce((partial, current) => {
    return partial
      .concat({ type: wild, info: { color: current }})
      .concat({ type: wild, info: { color: current, number: 4 }});
  }, [])).map(card => ({ ...card, deck: normal })))
}

async function down () {
  return this('decks').deleteMany({ deck: normal });
}

module.exports = { up, down };
