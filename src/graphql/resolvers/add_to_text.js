import textQuery from '../queries/text.query.graphql';

export const addToTextResolver = (_, { newText }, { cache }) => {
  const data = cache.readQuery({ query: textQuery });
  data.text = `${data.text} | ${newText}`;
  cache.writeData({ query: textQuery, data });
  return data.text;
};
