import { Card } from './card.class';

export class Board {
	constructor(public cards: Card[], public stringRepresentation: string) {
    this.cards = cards;
    this.stringRepresentation = stringRepresentation;
  }
}
