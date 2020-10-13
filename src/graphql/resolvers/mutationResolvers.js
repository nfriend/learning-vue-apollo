import textQuery from '../queries/text.query.graphql';
import isAwesomeFragment from '../fragments/isAwesome.fragment.graphql';

export const addToText = (_, { newText }, { cache }) => {
  const data = { ...cache.readQuery({ query: textQuery }) };

  data.text = `${data.text} | ${newText}`;

  cache.writeQuery({ query: textQuery, data });

  return data.text;
};

export const updateReleaseAwesomeness = (
  _,
  { tagName, isAwesome },
  { cache },
) => {
  const id = cache.identify({ __typename: 'Release', tagName });

  const data = {
    ...cache.readFragment({ fragment: isAwesomeFragment, id }),
    isAwesome,
  };

  cache.writeFragment({ fragment: isAwesomeFragment, id, data });

  return data.isAwesome;
};
