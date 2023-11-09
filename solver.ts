import { GameOfPokerFactory } from './src/factories/game-of-poker.factory.class';
import { SortedHandsOfCardsPrinter } from './src/game-of-poker/sorted-hands-of-cards-printer.class';

export class Solver {
	process(line: string): string {
		const pokerGameInstance =
			new GameOfPokerFactory().getPokerGameInstance(line);
		pokerGameInstance.findBestCombinationForEachHand();
		const sortedLine = SortedHandsOfCardsPrinter.turnsHandsOfCardsArrayToString(pokerGameInstance.getSortedHandsOfCards());

		return sortedLine;
	}
}
