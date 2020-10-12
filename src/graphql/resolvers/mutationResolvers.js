import textQuery from '../queries/text.query.graphql';
import releaseQuery from '../queries/releases.query.graphql';
import { cloneDeep } from 'lodash';

export const addToText = (_, { newText }, { cache }) => {
  const data = cloneDeep(cache.readQuery({ query: textQuery }));
  data.text = `${data.text} | ${newText}`;
  cache.writeQuery({ query: textQuery, data });

  return data.text;
};

export const updateReleaseAwesomeness = (
  _,
  { tagName, isAwesome },
  { cache },
) => {
  // TODO: is there a way around cloneDeep-ing the result every time?
  // Or maybe a way to operate on a smaller chunk of data so that
  // we don't have to clone the entire query response just to
  // flip one boolean property?
  const data = cloneDeep(cache.readQuery({ query: releaseQuery }));
  const releaseToUpdate = data.project.releases.nodes.find(
    r => r.tagName === tagName,
  );
  releaseToUpdate.isAwesome = isAwesome;
  cache.writeQuery({ query: releaseQuery, data });

  return releaseToUpdate.isAwesome;
};
