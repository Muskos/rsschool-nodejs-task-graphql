import { validate as uuidValidate } from 'uuid';
import { GraphQLError } from 'graphql';

import DB from '../../../utils/DB/DB';
import { UserEntity } from '../../../utils/DB/entities/DBUsers';

interface Context {
  db: DB;
}

interface Args {
  id: string;
}

const resolver = {
  User: {
    async posts(user: UserEntity, args: unknown, context: Context) {
      const posts = await context.db.posts.findMany({
        key: 'userId',
        equals: user.id,
      });

      return posts;
    },
    async profile(user: UserEntity, args: unknown, context: Context) {
      const profile = await context.db.profiles.findOne({
        key: 'userId',
        equals: user.id,
      });

      return profile;
    },
    async memberType(user: UserEntity, args: unknown, context: Context) {
      const profile = await context.db.profiles.findOne({
        key: 'userId',
        equals: user.id,
      });
      if (profile?.memberTypeId) {
        const memberType = await context.db.memberTypes.findOne({
          key: 'id',
          equals: profile?.memberTypeId,
        });
        return memberType;
      }

      return null;
    },
  },
  Query: {
    async users(root: unknown, args: unknown, context: Context) {
      const users = await context.db.users.findMany();
      return users;
    },
    async user(root: unknown, args: Args, context: Context) {
      if (uuidValidate(args.id)) {
        const user = await context.db.users.findOne({
          key: 'id',
          equals: args.id,
        });

        if (!user) {
          return new GraphQLError('user not found');
        }

        return user;
      }

      return new GraphQLError('invalid user id');
    },
  },
};

export default resolver;
