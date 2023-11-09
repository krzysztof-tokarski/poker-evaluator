import { CardsSetValuePayload } from '../interfaces/cards-set-value-payload.interface';
import { Card } from './card.class';

export class HandOfCards {
	public bestCardCombination!: CardsSetValuePayload;
	public equalHandsOfCardsRepresentations: string[] = [];

	constructor(public readonly cards: Card[], public readonly stringRepresentation: string) {
		this.cards = cards;
		this.stringRepresentation = stringRepresentation;
	}
}
