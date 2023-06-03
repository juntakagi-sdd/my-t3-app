import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  fetch: publicProcedure.query(async ({ ctx }) => {
    const notes = await ctx.prisma.notes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return notes;
  }),
  create: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.notes.create({
        data: { content: input.content },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.notes.delete({
        where: { id: input.id },
      });
    }),
});
