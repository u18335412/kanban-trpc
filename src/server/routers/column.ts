import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultColumnSelect = Prisma.validator<Prisma.ColumnSelect>()({
  id: true,
  title: true,
  task: {
    include: {
      Sub_Task: true,
    },
  },
  task_order: true,
});

export const columnRouter = createRouter()
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(200),
      board: z.string(),
    }),
    async resolve({ input }) {
      return prisma.column.create({
        data: input,
        select: defaultColumnSelect,
      });
    },
  })
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
          message: `No  with id '${id}'`,
        });
      }
      return column;
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
      return prisma.column.update({
        where: { id },
        data,
        select: defaultColumnSelect,
      });
    },
  })
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
  })
  .mutation('updateOrder', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        order: z.array(z.string()),
      }),
    }),
    async resolve({ input }) {
      const {
        id,
        data: { order },
      } = input;
      return prisma.column.update({
        where: { id },
        data: {
          task_order: order,
        },
        select: defaultColumnSelect,
      });
    },
  });
