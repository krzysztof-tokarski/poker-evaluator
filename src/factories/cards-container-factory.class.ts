import * as _ from 'lodash';
import { AMOUNT_OF_CHARACTERS_COMPOSING_SINGLE_CARD } from '../shared/constants';
import { Board } from '../shared/models/classes/board.class';
import { Card } from '../shared/models/classes/card.class';
import { HandOfCards } from '../shared/models/classes/hand-of-cards.class';
import { CardsFactory } from './cards.factory.class';

export class CardsContainerFactory {
	private static splitCardsStringOnEachCardRegExp = new RegExp(
		`.{${AMOUNT_OF_CHARACTERS_COMPOSING_SINGLE_CARD}}`,
		'g',
	);

	public static transformCardsStringToHandOfCards(
		cardsString: string,
	) {
		return new HandOfCards(
			_.orderBy(
				this.getArrayOfCards(cardsString),
				['cardRankValue' as keyof Card],
				'desc',
			),
			cardsString,
		);
	}

	public static transformCardsStringToBoard(cardsString: string): Board {
		return new Board(
			_.orderBy(
				this.getArrayOfCards(cardsString),
				['cardRankValue' as keyof Card],
				'desc',
			),
			cardsString,
		);
	}

	private static transformCardsStringToArrayOfCardStrings(
		cardsString: string,
	): string[] {
		return cardsString.match(
			this.splitCardsStringOnEachCardRegExp,
		) as string[];
	}

	private static createCardInstance(cardString: string): Card {
		return CardsFactory.createCardInstance(cardString);
	}

	private static getArrayOfCards(cardsString: string): Card[] {
		const cardStringsArray =
			this.transformCardsStringToArrayOfCardStrings(cardsString);
		return cardStringsArray.map((cardString) =>
			this.createCardInstance(cardString),
		);
	}
}
