import { InvalidArgumentError } from '../shared/errors/invalid-argument.error';
import { Card } from '../shared/models/classes/card.class';
import { CardRankSymbol } from '../shared/models/enums/card-rank-symbol.enum';
import { CardRankValue } from '../shared/models/enums/card-rank-value.enum';
import { getCardRankMap } from '../shared/models/enums/card-rank.map';
import { CardSuitSymbol } from '../shared/models/enums/card-suit-symbol.enum';

export class CardsFactory {
  private static cardStringRegExp: RegExp = /^((A|K|Q|J|T|[2-9])(h|d|c|s))$/;
  private static cardRankMap: Map<CardRankSymbol, CardRankValue> = getCardRankMap();

  public static createCardInstance(cardString: string) {
    const validCardString = this.cardStringRegExp.test(cardString);

    if (!validCardString) throw new InvalidArgumentError('Provided card string format was invalid.', cardString);

    const [cardRankStr, cardSuitSymbolStr] = cardString.split('');

    const cardRankSymbol = cardRankStr as CardRankSymbol;
    const cardRankValue = this.cardRankMap.get(cardRankSymbol) as CardRankValue;
    const cardSuitSymbol = cardSuitSymbolStr as CardSuitSymbol;

    return new Card(cardSuitSymbol, cardRankValue, cardRankSymbol);
  }
}
