import { CardRankSymbol } from '../enums/card-rank-symbol.enum';
import { CardRankValue } from '../enums/card-rank-value.enum';
import { CardSuitSymbol } from '../enums/card-suit-symbol.enum';

export class Card {
	constructor(
		public readonly cardSuit: CardSuitSymbol,
		public readonly cardRankValue: CardRankValue,
		public readonly cardRankSymbol: CardRankSymbol,
	) {
    this.cardSuit = cardSuit;
    this.cardRankValue = cardRankValue;
    this.cardRankSymbol = cardRankSymbol;
  }
}
