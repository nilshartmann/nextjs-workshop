import { PrismaClient } from "@prisma/client";
import {
  GetRecipeFeedbacksResponse,
  NewFeedback,
} from "@/app/components/api-types.ts";

const prisma = new PrismaClient();

export async function saveFeedback(recipeId: string, newFeedback: NewFeedback) {
  const result = await prisma.feedbacks.create({
    data: {
      createdAt: new Date(),
      commenter: newFeedback.commenter,
      comment: newFeedback.comment,
      rating: newFeedback.stars,
      recipeId: parseInt(recipeId),
    },
  });

  console.log("New Feedback", result.id);
  return;
}

export async function queryFeedback(
  recipeId: string,
): Promise<GetRecipeFeedbacksResponse> {
  const feedbackFromDb = await prisma.feedbacks.findMany({
    where: {
      recipeId: parseInt(recipeId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const feedbackList = feedbackFromDb.map((f) => ({
    id: f.id,
    recipeId: String(f.recipeId),
    comment: f.comment,
    commenter: f.commenter,
    rating: f.rating,
    createdAt: String(f.createdAt), // todo
  }));

  return {
    feedbacks: feedbackList,
  };

  // return fetchFromApi(
  //   getEndpointConfig("get", "/api/recipes/{recipeId}/feedbacks"),
  //   {
  //     path: {
  //       recipeId,
  //     },
  //     query: {
  //       slowdown: slowDown_GetFeedbacks,
  //     },
  //   },
  // );
}
