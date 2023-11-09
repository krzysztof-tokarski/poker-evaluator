import { FiveCardDraw } from '../game-of-poker/five-card-draw/five-card-draw.class';
import { PokerGameInstance } from '../game-of-poker/poker-game-instance.type';
import { MINIMUM_AMOUNT_OF_ARGUMENTS_IN_LINE } from '../shared/constants';
import { InvalidArgumentError } from '../shared/errors/invalid-argument.error';
import { UnexpectedEnumValue } from '../shared/errors/unexpected-enum-value.error';
import { PokerGameType } from '../shared/models/enums/poker-game-type.enum';
import { gameOfPokerConstructorOptionsMap } from '../shared/models/interfaces/game-of-poker-constructor-options.map';
import { GameOfPokerConstructorOptions } from '../shared/models/interfaces/game-of-poker-contructor.options';

type InputArray = [PokerGameType, ...string[]];

export class GameOfPokerFactory {
	private readonly constructorOptionsMap =
		gameOfPokerConstructorOptionsMap;

	public getPokerGameInstance(input: string): PokerGameInstance {
		const [gameType, ...cardsStrings] = this.turnInputToArray(input);

		return this.createPokerGameInstance(gameType, cardsStrings);
	}

	private turnInputToArray(input: string): InputArray {
		const minimumInputArrayLength =
			MINIMUM_AMOUNT_OF_ARGUMENTS_IN_LINE;
		const inputArray = input.split(' ');

		if (inputArray.length < minimumInputArrayLength)
			throw new InvalidArgumentError(
				"Gametype or cards haven't been provided",
				input,
			);

		return inputArray as InputArray;
	}

	private createPokerGameInstance(
		gameType: PokerGameType,
		cardsStrings: string[],
	): PokerGameInstance {
		switch (gameType) {
			case PokerGameType.TEXAS_HOLDEM: {
				throw new Error('Not supported');
				// return new TexasHoldem(cardsStrings, this.constructorOptionsMap.get(PokerGameType.TEXAS_HOLDEM) as GameOfPokerConstructorOptions);
			}
			case PokerGameType.OMAHA_HOLDEM: {
				throw new Error('Not supported');
				// return new OmahaHoldem(cardsStrings, this.constructorOptionsMap.get(PokerGameType.OMAHA_HOLDEM) as GameOfPokerConstructorOptions);
			}
			case PokerGameType.FIVE_CARD_DRAW: {
				return new FiveCardDraw(
					cardsStrings,
					this.constructorOptionsMap.get(
						PokerGameType.FIVE_CARD_DRAW,
					) as GameOfPokerConstructorOptions,
				);
			}
			default: {
				throw new UnexpectedEnumValue('PokerGameType', gameType);
			}
		}
	}
}
