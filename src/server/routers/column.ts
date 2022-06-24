/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultColumnSelect = Prisma.validator<Prisma.ColumnSelect>()({
  id: true,
  title: true,
});

export const columnRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(200),
    }),
    async resolve({ input }) {
      const column = await prisma.column.create({
        data: input,
        select: defaultColumnSelect,
      });
      return column;
    },
  })
  // read
  .query('all', {
    async resolve() {
      return prisma.column.findMany({
        select: defaultColumnSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const column = await prisma.column.findUnique({
        where: { id },
        select: defaultColumnSelect,
      });
      if (!column) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return column;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(200).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const column = await prisma.column.update({
        where: { id },
        data,
        select: defaultColumnSelect,
      });
      return column;
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.column.delete({ where: { id } });
      return {
        id,
      };
    },
  });
