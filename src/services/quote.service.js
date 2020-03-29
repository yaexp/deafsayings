import quotes from '~mockdata/quotes.data.json';
import authors from '~mockdata/authors.data.json';

import { Quote } from '~src/models/quote.model';

export const getQuotes = () => {
  return quotes.map((quote) => {
    const author = authors.find((_author) => _author.id === quote.authorId);

    return new Quote({ ...quote, author });
  });
};

export const getQuote = (quoteId) => {
  console.log('getQuote');
  return getQuotes().find((quote) => quote.id === quoteId);
};

export const getQuoteCount = () => {
  console.log('getQuoteCount');
  return getQuotes().length;
};

export const getQuoteIds = () => {
  console.log('getQuoteIds');
  return getQuotes().map((quote) => quote.id);
};
