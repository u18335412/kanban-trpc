import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultboardSelect = Prisma.validator<Prisma.BoardSelect>()({
  id: true,
  title: true,
});

export const boardRouter = createRouter()
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(200),
    }),
    async resolve({ input }) {
      const board = await prisma.board.create({
        data: input,
        select: defaultboardSelect,
      });
      return board;
    },
  })
  .query('all', {
    async resolve() {
      return prisma.board.findMany({
        select: { ...defaultboardSelect, ...{ Column: true } },
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const board = await prisma.board.findUnique({
        where: { id },
        select: defaultboardSelect,
      });
      if (!board) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No board with id '${id}'`,
        });
      }
      return board;
    },
  })

  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(200).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const board = await prisma.board.update({
        where: { id },
        data,
        select: defaultboardSelect,
      });
      return board;
    },
  })

  .mutation('delete', {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.board.delete({ where: { id } });
      return {
        id,
      };
    },
  });
