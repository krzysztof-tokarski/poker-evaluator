import { CardRankSymbol } from './card-rank-symbol.enum';
import { CardRankValue } from './card-rank-value.enum';

export const getCardRankMap = () => {
  const map: Map<CardRankSymbol, CardRankValue> = new Map();

  Object.keys(CardRankSymbol).forEach((key: string) => {
    map.set(
      CardRankSymbol[key as keyof typeof CardRankSymbol],
      CardRankValue[key as keyof typeof CardRankValue],
    );
  });

  return map;
};
