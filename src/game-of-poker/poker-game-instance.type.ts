import { FiveCardDraw } from './five-card-draw/five-card-draw.class';
import { OmahaHoldem } from './holdem/omaha/omaha-holdem.class';
import { TexasHoldem } from './holdem/texas/texas-holdem.class';

export type PokerGameInstance =
	| FiveCardDraw
	| OmahaHoldem
	| TexasHoldem;
