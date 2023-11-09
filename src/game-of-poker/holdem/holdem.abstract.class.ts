import { AMOUNT_OF_CHARACTERS_COMPOSING_SINGLE_CARD } from '../../shared/constants';
import { Board } from '../../shared/models/classes/board.class';
import { GameOfPoker } from '../game-of-poker.abstract.class';

export abstract class Holdem extends GameOfPoker {
	public cardsOnBoardString!: string;
	public board!: Board;

	protected areCardsStringsValid(cardsStrings: string[]): void {
		const [cardsOnBoardString, ...handsOfCardsStrings] = cardsStrings;

		this.isCardsStringOfAproppriateLength(
			cardsOnBoardString,
			this.amountOfCardsOnBoard as number *
				AMOUNT_OF_CHARACTERS_COMPOSING_SINGLE_CARD,
		);

		this.cardsOnBoardString = cardsOnBoardString;

		super.areCardsStringsValid(handsOfCardsStrings);
	}

	protected setupGame(): void {
		this.cardsOnBoardString

		super.setupGame();
	}
}
