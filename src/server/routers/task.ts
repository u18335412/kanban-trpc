import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultTaskSelect = Prisma.validator<Prisma.TaskSelect>()({
  id: true,
  title: true,
  description: true,
  column_id: true,
  Sub_Task: true,
});

export const taskRouter = createRouter()
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(200),
      description: z.string().min(1).max(200),
      column_id: z.string(),
    }),
    async resolve({ input }) {
      return prisma.task.create({
        data: input,
        select: defaultTaskSelect,
      });
    },
  })
  .query('all', {
    async resolve() {
      return prisma.task.findMany({
        select: defaultTaskSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const board = await prisma.task.findUnique({
        where: { id },
        select: defaultTaskSelect,
      });
      if (!board) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No task with id '${id}'`,
        });
      }
      return board;
    },
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(200),
        column_id: z.string(),
        Sub_Task: z.array(
          z.object({
            title: z.string(),
            task_id: z.string().uuid(),
            complete: z.boolean(),
          }),
        ),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      return prisma.task.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          column_id: data.column_id,
        },
        select: defaultTaskSelect,
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.task.delete({ where: { id } });
      return {
        id,
      };
    },
  });