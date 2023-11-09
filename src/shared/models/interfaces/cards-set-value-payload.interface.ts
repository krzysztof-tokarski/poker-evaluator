import { Card } from '../classes/card.class';
import { HandValue } from '../enums/hand-value.enum';

export interface CardsSetValuePayload {
	setValue: HandValue;
	cardsSet: Card[];
}
