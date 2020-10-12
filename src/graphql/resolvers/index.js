import * as mutationResolvers from './mutationResolvers';
import * as releaseResolvers from './releaseResolvers';

export const resolvers = {
  Mutation: mutationResolvers,
  Release: releaseResolvers,
};
