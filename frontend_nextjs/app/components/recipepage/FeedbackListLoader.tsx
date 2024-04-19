import FeedbackList from "./FeedbackList.tsx";
import { queryFeedback } from "@/app/feedback-db.ts";

type FeedbackListProps = {
  recipeId: string;
};
export default async function FeedbackListLoader({
  recipeId,
}: FeedbackListProps) {
  console.log("FeedbackListLoader", Date.now());
  const data = await queryFeedback(recipeId);

  return <FeedbackList feedbacks={data.feedbacks} />;
}
