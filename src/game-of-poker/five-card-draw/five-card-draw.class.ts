import { CardsSetValueVerifier } from '../cards-set-value-verifier.class';
import { GameOfPoker } from '../game-of-poker.abstract.class';

export class FiveCardDraw extends GameOfPoker {
	public findBestCombinationForEachHand(): void {
		this.handsOfCards.forEach((handOfCards) => {
			const { cards } = handOfCards;
			const verifier = new CardsSetValueVerifier();

			const bestValueForSetOfCards = verifier.getSetValue([...cards]);
			handOfCards.bestCardCombination = bestValueForSetOfCards;
		});
	}
}
