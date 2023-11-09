import { HandOfCards } from '../shared/models/classes/hand-of-cards.class';

export class SortedHandsOfCardsPrinter {
	public static turnsHandsOfCardsArrayToString(
		handsOfCards: HandOfCards[],
	): string {
		let sortedHandsStringRepresentation =
			handsOfCards[0].stringRepresentation;

		for (let i = 1; i < handsOfCards.length; i++) {
			const previousIndexStrRepr =
				handsOfCards[i - 1].stringRepresentation;

			const areEqual = handsOfCards[i - 1].equalHandsOfCardsRepresentations.includes(previousIndexStrRepr);
			const separator = areEqual ? '=' : ' ';

			sortedHandsStringRepresentation += `${separator}${handsOfCards[i].stringRepresentation}`;
		}
		return sortedHandsStringRepresentation;
	}
}
