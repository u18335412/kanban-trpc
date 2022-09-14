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
      description: z.string().max(200),
      column_id: z.string(),
      sub_tasks: z.array(
        z.object({
          title: z.string().min(1).max(200),
        }),
      ),
    }),
    async resolve({ input: { title, description, column_id, sub_tasks } }) {
      return prisma.task.create({
        data: {
          title,
          description,
          column_id,
          Sub_Task: {
            create: sub_tasks.map(({ title }) => ({
              title,
              complete: false,
            })),
          },
        },
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
        column_id: z.string().min(1),
        Sub_Task: z.array(
          z
            .object({
              title: z.string(),
              task_id: z.string().uuid(),
              complete: z.boolean(),
            })
            .optional(),
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
  .mutation('switchColumns', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        to_column_id: z.string().uuid(),
      }),
    }),
    async resolve({ input }) {
      const {
        id,
        data: { to_column_id },
      } = input;
      return prisma.task.update({
        where: { id },
        data: {
          column_id: to_column_id,
        },
        select: {
          id: true,
        },
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
