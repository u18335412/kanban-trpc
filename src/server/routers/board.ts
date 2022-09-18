import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultboardSelect = Prisma.validator<Prisma.BoardSelect>()({
  id: true,
  title: true,
  Column: true,
  columnOrder: true,
});

export const boardRouter = createRouter()
  .mutation('add', {
    input: z.object({
      title: z.string().min(1).max(200),
      columns: z
        .array(
          z.object({
            title: z.string().min(1).max(200),
          }),
        )
        .optional(),
    }),
    async resolve({ input }) {
      const { title, columns } = input;
      return prisma.board.create({
        data: {
          title: title,
          Column: {
            create: columns,
          },
        },
        select: defaultboardSelect,
      });
    },
  })
  .query('all', {
    async resolve() {
      return prisma.board.findMany({
        select: { ...defaultboardSelect },
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
        select: {
          ...defaultboardSelect,
          Column: {
            include: {
              task: {
                include: {
                  Sub_Task: true,
                },
              },
            },
          },
        },
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
  .query('getColumns', {
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
      id: z.string().min(1).max(200),
      data: z.object({
        title: z.string().min(1).max(200),
        updateOrNewcolumns: z
          .array(
            z.object({
              title: z.string().min(1).max(200),
              id: z.string(),
            }),
          )
          .optional(),
        removeColumns: z
          .array(
            z.object({
              title: z.string().min(1).max(200),
              id: z.string().min(1).max(200),
            }),
          )
          .optional(),
      }),
    }),
    async resolve({ input }) {
      const {
        id,
        data: { title, updateOrNewcolumns, removeColumns },
      } = input;
      const board = await prisma.board.update({
        where: { id },
        data: {
          title: title,
        },
        select: defaultboardSelect,
      });

      if (!board)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Error while updating board with id:'${id}'`,
        });

      updateOrNewcolumns?.forEach(async (column) => {
        await prisma.column.upsert({
          where: {
            id: column.id,
          },
          update: {
            title: column.title,
          },
          create: {
            title: column.title,
            board_id: id,
          },
        });
      });

      await prisma.column.deleteMany({
        where: {
          id: {
            in: removeColumns?.map((column) => column.id) || [],
          },
        },
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
  })
  .mutation('updateColumnOrder', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        columnOrder: z.array(z.string()),
      }),
    }),
    async resolve({ input }) {
      const {
        id,
        data: { columnOrder },
      } = input;
      await prisma.board.update({
        where: { id },
        data: {
          columnOrder: columnOrder.toString(),
        },
      });
      return {
        id,
      };
    },
  });
