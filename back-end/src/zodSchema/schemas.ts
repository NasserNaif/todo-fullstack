import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "username is required !",
      invalid_type_error: "sorry invalid input type in username ",
    }),
    password: z.string({
      required_error: "username is required !",
      invalid_type_error: "sorry invalid input type in username ",
    }),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "username is required !",
        invalid_type_error: "sorry invalid input type in username ",
      })
      .min(3, "username must be more than 2 chars !")
      .max(15, "username must be less than 16"),
    password: z.string({
      required_error: "password is required !",
      invalid_type_error: "sorry invalid input type in password ",
    }),
    email: z
      .string({
        required_error: "email is required !",
        invalid_type_error: "sorry invalid input type in email ",
      })
      .min(4, "email must be more then 4 chars ")
      .email(),
  }),
});

export const addTodoSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "title is required !",
        invalid_type_error: "sorry invalid input type in title ",
      })
      .max(20, `title must be less than 20 chars`),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    todoid: z.string({
      required_error: "todo id is required !",
      invalid_type_error: "sorry invalid input type in todo id ",
    }),
  }),
  body: z.object({
    name: z
      .string({
        required_error: "title is required !",
        invalid_type_error: "sorry invalid input type in title ",
      })
      .max(20, `title must be less than 20 chars`),
  }),
});

export const deleteTodoSchema = z.object({
  params: z.object({
    todoid: z.string({
      required_error: "todo id is required !",
      invalid_type_error: "sorry invalid input type in todo id ",
    }),
  }),
});

export type updateTodoParamsType = z.infer<typeof updateTodoSchema>["params"];
export type deleteTodoParamsType = z.infer<typeof deleteTodoSchema>["params"];
