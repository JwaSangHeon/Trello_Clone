import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "제목은 필수값입니다.",
      invalid_type_error: "제목은 필수값입니다.",
    })
    .min(3, {
      message: "제목은 3글자 이상이여야합니다.",
    }),
});
