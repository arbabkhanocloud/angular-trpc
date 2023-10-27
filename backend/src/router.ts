import { z } from "zod";
import { t } from "./trpc";
import { TRPCError } from "@trpc/server";
import { ITodo } from "../../lib/index";

let todo: ITodo[] = [
  {
    todoID: "1",
    text: "first todo",
    done: false,
  },
];

const trpcRouter = t.router({
  listTodo: t.procedure.query(() => todo),
  addTodo: t.procedure
    .input(
      z.object({
        todoID: z.string(),
        text: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(({ input }) => {
      todo.push(input);
      return todo;
    }),
  updateTodo: t.procedure
    .input(
      z.object({
        todoID: z.string(),
        text: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(({ input }) => {
      const index = todo.findIndex((t) => t.todoID === input.todoID);
      if (index !== -1) {
        todo[index] = { ...input };
        return todo;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "TODO not found with the specified ID",
        });
      }
    }),

  deleteTodo: t.procedure.input(z.string()).mutation(({ input }) => {
    const index = todo.findIndex((t) => t.todoID === input);
    if (index !== -1) {
      todo.splice(index, 1);
      return todo;
    } else {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "TODO not found with the specified ID",
      });
    }
  }),
});

export type TRPCRouter = typeof trpcRouter;
export default trpcRouter;
