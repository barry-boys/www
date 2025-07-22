import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const contact = {
  sendContact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      company: z.string(),
      message: z.string(),
    }),
    handler: async (input) => {
      return `${input.name}, ${input.email}, ${input.company}, ${input.message}`;
    },
  }),
};
