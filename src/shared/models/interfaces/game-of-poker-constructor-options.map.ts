import { CardsPerHand } from '../enums/cards-per-hand.enum';
import { PokerGameType } from '../enums/poker-game-type.enum';
import { GameOfPokerConstructorOptions } from './game-of-poker-contructor.options';

export const gameOfPokerConstructorOptionsMap: Map<
	PokerGameType,
	GameOfPokerConstructorOptions
> = new Map([
	[
		PokerGameType.FIVE_CARD_DRAW,
		{
			gameType: PokerGameType.FIVE_CARD_DRAW,
			cardsPerHand: CardsPerHand.FIVE_CARD_DRAW,
		},
	],
	[
		PokerGameType.OMAHA_HOLDEM,
		{
			gameType: PokerGameType.OMAHA_HOLDEM,
			cardsPerHand: CardsPerHand.OMAHA_HOLDEM,
      amountOfCardsOnBoard: 5,
		},
	],
  [
    PokerGameType.TEXAS_HOLDEM,
		{
			gameType: PokerGameType.TEXAS_HOLDEM,
			cardsPerHand: CardsPerHand.TEXAS_HOLDEM,
      amountOfCardsOnBoard: 5,
		},
  ]
]);
