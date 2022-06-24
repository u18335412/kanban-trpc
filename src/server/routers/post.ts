import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  text: true,
  createdAt: true,
  updatedAt: true,
});

export const postRouter = createRouter()
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(32),
      text: z.string().min(1),
    }),
    async resolve({ input }) {
      const post = await prisma.post.create({
        data: input,
        select: defaultPostSelect,
      });
      return post;
    },
  })
  .query('all', {
    async resolve() {
      return prisma.post.findMany({
        select: defaultPostSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const post = await prisma.post.findUnique({
        where: { id },
        select: defaultPostSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    },
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const post = await prisma.post.update({
        where: { id },
        data,
        select: defaultPostSelect,
      });
      return post;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.post.delete({ where: { id } });
      return {
        id,
      };
    },
  });
