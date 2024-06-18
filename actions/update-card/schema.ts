import { z } from "zod";

export const UpdateCard = z.object({
  title: z
    .string({
      required_error: "제목은 필수값입니다.",
      invalid_type_error: "제목은 필수값입니다.",
    })
    .min(3, {
      message: "제목은 3글자 이상이여야합니다.",
    }),
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "설명은 필수값입니다.",
        invalid_type_error: "설명은 필수값입니다.",
      })
      .min(3, {
        message: "설명은 3글자 이상이여야합니다.",
      })
  ),
  id: z.string(),
});
