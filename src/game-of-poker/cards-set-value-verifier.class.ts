import _ from 'lodash';
import { Card } from '../shared/models/classes/card.class';
import { CardRankValue } from '../shared/models/enums/card-rank-value.enum';
import { HandValue } from '../shared/models/enums/hand-value.enum';
import { CardsSetValuePayload } from '../shared/models/interfaces/cards-set-value-payload.interface';

export class CardsSetValueVerifier {
	public getSetValue(cards: Card[]): CardsSetValuePayload {
		const straightFlush = this.getStraightFlush(cards);
		if (!_.isEmpty(straightFlush))
			return {
				setValue: HandValue.STRAIGHT_FLUSH,
				cardsSet: straightFlush,
			};

		const fourOfAKind = this.getFourOfAKind(cards);
		if (!_.isEmpty(fourOfAKind))
			return {
				setValue: HandValue.FOUR_OF_A_KIND,
				cardsSet: fourOfAKind,
			};

		const fullHouse = this.getFullHouse(cards);
		if (!_.isEmpty(fullHouse))
			return { setValue: HandValue.FULL_HOUSE, cardsSet: fullHouse };

		const flush = this.getFlush(cards);
		if (!_.isEmpty(flush))
			return { setValue: HandValue.FLUSH, cardsSet: flush };

		const straight = this.getStraight(cards);
		if (!_.isEmpty(straight))
			return { setValue: HandValue.STRAIGHT, cardsSet: straight };

		const threeOfAKind = this.getThreeOfAKind(cards);
		if (!_.isEmpty(threeOfAKind))
			return {
				setValue: HandValue.THREE_OF_A_KIND,
				cardsSet: threeOfAKind,
			};

		const twoPairs = this.getTwoPairs(cards);
		if (!_.isEmpty(twoPairs))
			return { setValue: HandValue.TWO_PAIRS, cardsSet: twoPairs };

		const pair = this.findPairBasedOnCardProp(cards, 'cardRankValue');
		if (!_.isEmpty(pair))
			return { setValue: HandValue.PAIR, cardsSet: pair };

		return {
			setValue: HandValue.HIGH_CARD,
			cardsSet: this.getHighCard(cards),
		};
	}

	private getStraightFlush(cards: Card[]): Card[] {
		const isStraight = this.getStraight(cards);
		if (_.isEmpty(isStraight)) return [];

		const isFlush = this.getFlush(cards);
		if (_.isEmpty(isFlush)) return [];

		return cards;
	}

	private getFourOfAKind(cards: Card[]): Card[] {
		const firstPair = this.findPairBasedOnCardProp(
			cards,
			'cardRankValue',
		);
		if (_.isEmpty(firstPair)) return [];

		const secondPair = this.findPairBasedOnCardProp(
			_.difference(cards, firstPair),
			'cardRankValue',
		);
		if (_.isEmpty(secondPair)) return [];

		return firstPair.concat(secondPair);
	}

	private getFullHouse(cards: Card[]): Card[] {
		const threeOfAkind = this.getThreeOfAKind(cards);
		if (_.isEmpty(threeOfAkind)) return [];

		const pair = this.findPairBasedOnCardProp(
			_.difference(cards, threeOfAkind),
			'cardRankValue',
		);
		if (_.isEmpty(pair)) return [];

		return threeOfAkind.concat(pair);
	}

	private getFlush(cards: Card[]): Card[] {
		return cards.every((card) => cards[0].cardSuit === card.cardSuit)
			? cards
			: [];
	}

	private getStraight(cards: Card[]): Card[] {
		const containsAce = cards[0].cardRankValue === CardRankValue.ACE;

		for (let i = 0; i < cards.length - 1; i++) {
			if (cards[i].cardRankValue === cards[i + 1].cardRankValue + 1)
				continue;

			if (containsAce) {
				const cardsCopy = [...cards];
				cardsCopy.push(cardsCopy.shift() as Card);

				const firstCardIsFive =
					cardsCopy[0].cardRankValue === CardRankValue.FIVE;
				if (!firstCardIsFive) return [];

				for (let i = 0; i < cardsCopy.length - 2; i++) {
					if (
						cardsCopy[i].cardRankValue ===
						cardsCopy[i + 1].cardRankValue + 1
					)
						continue;

					return [];
				}

				return cardsCopy;
			}

			return [];
		}

		return cards;
	}

	private getThreeOfAKind(cards: Card[]): Card[] {
		const firstTwo = this.findPairBasedOnCardProp(
			cards,
			'cardRankValue',
		);
		if (_.isEmpty(firstTwo)) return [];

		const third = _.difference(cards, firstTwo).find(
			(card) => card.cardRankValue === firstTwo[0].cardRankValue,
		);
		if (_.isEmpty(third)) return [];

		return firstTwo.concat(third);
	}

	private getTwoPairs(cards: Card[]): Card[] {
		const firstPair = this.findPairBasedOnCardProp(
			cards,
			'cardRankValue',
		);
		if (_.isEmpty(firstPair)) return [];

		const secondPair = this.findPairBasedOnCardProp(
			_.difference(cards, firstPair),
			'cardRankValue',
		);
		if (_.isEmpty(secondPair)) return [];

		return secondPair.concat(firstPair);
	}

	private findPairBasedOnCardProp(
		cards: Card[],
		property: keyof Card,
	): Card[] {
		for (let i = 0; i < cards.length; i++) {
			const currentIndexCard = cards[i];

			for (let j = 0; j < cards.length; j++) {
				if (
					j === i ||
					currentIndexCard[property] !== cards[j][property]
				)
					continue;

				return [currentIndexCard, cards[j]];
			}
		}

		return [];
	}

	private getHighCard(cards: Card[]): Card[] {
		return [_.first(cards) as Card];
	}
}
