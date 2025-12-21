import type { User } from '@prisma/client';
import { TRPCError, initTRPC } from '@trpc/server';
 
interface Context {
  user?: User
}
 
const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;
export const router = t.router;
 
export const protectedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED',
      message: "You don't have access to this resource.",
    });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});