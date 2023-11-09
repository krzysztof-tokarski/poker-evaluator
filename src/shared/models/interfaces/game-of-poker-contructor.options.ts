import { CardsPerHand } from '../enums/cards-per-hand.enum';
import { PokerGameType } from '../enums/poker-game-type.enum';

export interface GameOfPokerConstructorOptions {
	gameType: PokerGameType;
	cardsPerHand: CardsPerHand;
  amountOfCardsOnBoard?: number;
}
