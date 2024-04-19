"use server";

import { zfd } from "zod-form-data";
import { z } from "zod";
import { saveFeedback } from "@/app/feedback-db.ts";
import { revalidatePath } from "next/cache";

export type FeedbackFormState =
  | { result?: never; message?: never; key?: never }
  | { result: "success"; message?: string; key: string }
  | { result: "error"; message: string; key?: never };

const FormSchema = zfd.formData({
  recipeId: zfd.text(),
  stars: zfd.numeric(z.number().min(1).max(5)),
  comment: zfd.text(z.string().max(1000)),
  commenter: zfd.text(z.string().min(3)),
});

export async function feedbackFormAction(
  prevState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  console.log("feedbackFormAction :: prevState", prevState, formData);

  const data = FormSchema.safeParse(formData);

  if (!data.success) {
    const i = data.error.issues.map((i) => i.path.join(".")).join(", ");
    console.log("ERROR", data.error);
    return {
      result: "error",
      message:
        "Invalid Form Data submitted. Please make sure to fill out the form correctly. Invalid field: " +
        i,
    };
  }

  const { recipeId, ...payload } = data.data;

  await saveFeedback(recipeId, payload);

  // const tag = `feedback/${recipeId}`;

  // const result = await fetchFromApi(
  //   getEndpointConfig("post", "/api/recipes/{recipeId}/feedbacks"),
  //   {
  //     path: { recipeId },
  //     body: { feedbackData: payload },
  //     query: {
  //       slowdown: slowDown_AddFeedback,
  //     },
  //   },
  //   [tag],
  // );
  //
  // revalidateTag(tag);

  const path = `/recipes/${recipeId}`;
  console.log("Revalidate", path);

  revalidatePath(path);

  return {
    result: "success",
    // please forgive me 🙏
    //   there will be a better React API to
    //   reset a form after a successful action
    //   but until then we just generate a new key
    //   to make react (re-)mount a new component
    //   "instance" of the FeedbackForm
    key: Date.now().toString(),
  };
}
