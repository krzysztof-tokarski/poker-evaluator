import { CardsContainerFactory } from '../factories/cards-container-factory.class';
import { AMOUNT_OF_CHARACTERS_COMPOSING_SINGLE_CARD } from '../shared/constants';
import { InvalidArgumentError } from '../shared/errors/invalid-argument.error';
import { HandOfCards } from '../shared/models/classes/hand-of-cards.class';
import { CardsPerHand } from '../shared/models/enums/cards-per-hand.enum';
import { HandValue } from '../shared/models/enums/hand-value.enum';
import { PokerGameType } from '../shared/models/enums/poker-game-type.enum';
import { GameOfPokerConstructorOptions } from '../shared/models/interfaces/game-of-poker-contructor.options';

export abstract class GameOfPoker {
	public gameType: PokerGameType;
	public cardsPerHand: CardsPerHand;
	public handsOfCardsStrings!: string[];
	public amountOfCardsOnBoard?: number;
	public handsOfCards!: HandOfCards[];

	public abstract findBestCombinationForEachHand(): void;

	public getSortedHandsOfCards(): HandOfCards[] {
		const handsOfCardsCopy = [...this.handsOfCards];
		handsOfCardsCopy.reverse();

		handsOfCardsCopy.sort((a, b) => {
			const {
				cards: cardsA,
				bestCardCombination: {
					setValue: setValueA,
					cardsSet: cardsSetA,
				},
			} = a;

			const {
				cards: cardsB,
				bestCardCombination: {
					setValue: setValueB,
					cardsSet: cardsSetB,
				},
			} = b;

			const handValueComparison = setValueA - setValueB;
			if (handValueComparison !== 0) return handValueComparison;

			if (setValueA === HandValue.FULL_HOUSE) {
				const rankOfCardSetA = cardsSetA[0].cardRankValue;
				const rankOfCardSetB = cardsSetB[0].cardRankValue;

				return rankOfCardSetA - rankOfCardSetB;
			}

			for (let i = 0; i < cardsSetA.length; i++) {
				const comparison =
					cardsSetA[i].cardRankValue - cardsSetB[i].cardRankValue;

				if (comparison === 0) continue;
				return comparison;
			}

			for (let i = 0; i < cardsA.length; i++) {
				const comparison =
					cardsA[i].cardRankValue - cardsB[i].cardRankValue;

				if (comparison === 0) continue;
				return comparison;
			}

			const strReprA = a.stringRepresentation;
			const strReprB = b.stringRepresentation;

			a.equalHandsOfCardsRepresentations.push(strReprB);
			b.equalHandsOfCardsRepresentations.push(strReprB);

			return strReprA > strReprB ? 1 : -1;
		});

		return handsOfCardsCopy;
	}

	constructor(
		cardsStrings: string[],
		options: GameOfPokerConstructorOptions,
	) {
		this.gameType = options.gameType;
		this.cardsPerHand = options.cardsPerHand;
		this.amountOfCardsOnBoard = options?.amountOfCardsOnBoard;

		this.areCardsStringsValid(cardsStrings);

		this.setupGame();
	}

	protected areCardsStringsValid(cardsStrings: string[]) {
		this.handsOfCardsStrings = cardsStrings;

		const charactersPerHand =
			AMOUNT_OF_CHARACTERS_COMPOSING_SINGLE_CARD * this.cardsPerHand;

		cardsStrings.forEach((handOfCardsString) =>
			this.isCardsStringOfAproppriateLength(
				handOfCardsString,
				charactersPerHand,
			),
		);
	}

	protected isCardsStringOfAproppriateLength(
		cardsString: string,
		envisagedAmountOfCharacters: number,
	) {
		const validAmountOfCharacters =
			cardsString.length === envisagedAmountOfCharacters;

		if (validAmountOfCharacters) return;

		throw new InvalidArgumentError(
			`Provided cards string was of invalid length - game type: ${this.gameType}, expected length: ${envisagedAmountOfCharacters}, actual length: ${cardsString.length}`,
			cardsString,
		);
	}

	protected transformCardsStringToHandOfCards(
		cardString: string,
	): HandOfCards {
		return CardsContainerFactory.transformCardsStringToHandOfCards(
			cardString,
		);
	}

	protected setupGame() {
		this.handsOfCards = this.handsOfCardsStrings.map(
			(handOfCardString) =>
				this.transformCardsStringToHandOfCards(handOfCardString),
		);
	}
}
