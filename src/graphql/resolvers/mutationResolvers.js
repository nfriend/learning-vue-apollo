import textQuery from '../queries/text.query.graphql';
import releaseQuery from '../queries/releases.query.graphql';

export const addToTextResolver = (_, { newText }, { cache }) => {
  const data = cache.readQuery({ query: textQuery });
  data.text = `${data.text} | ${newText}`;
  cache.writeData({ query: textQuery, data });

  return data.text;
};

export const updateReleaseAwesomeness = (
  _,
  { tagName, isAwesome },
  { cache },
) => {
  console.log('inside updateReleaseAwesomeness resolver');
  const allReleases = cache.readQuery({ query: releaseQuery });
  console.log('allReleases');
  const releaseToUpdate = allReleases.find(r => r.tagName === tagName);
  releaseToUpdate.isAwesome = isAwesome;
  cache.writeQuery({ query: releaseQuery, data: allReleases });

  return releaseToUpdate.isAwesome;
};
