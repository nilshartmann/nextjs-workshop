"use client";
import { Input, Textarea } from "../Input";
import { Button } from "../Button.tsx";
import ButtonBar from "../ButtonBar.tsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  feedbackFormAction,
  FeedbackFormState,
} from "@/app/components/material/feedback-actions.ts";
import RatingInput from "@/app/components/recipepage/RatingInput.tsx";
import { useFormState } from "react-dom";

type AddFeedbackFormProps = {
  recipeId: string;
};

export function AddFeedbackForm({ recipeId }: AddFeedbackFormProps) {
  // useFormState will be replaced by useActionState
  //   useActionState also has a isPending information
  const [currentState, formAction] = useFormState(feedbackFormAction, {});

  return (
    <FeedbackForm
      recipeId={recipeId}
      formAction={formAction}
      formState={currentState}
      key={currentState.key || "form1"}
    />
  );
}

type FeedbackFormProps = {
  recipeId: string;
  formAction: (fd: FormData) => void;
  formState: FeedbackFormState;
};

function FeedbackForm({ recipeId, formAction, formState }: FeedbackFormProps) {
  const [stars, setStars] = useState(-1);
  const [commentLength, setCommentLength] = useState(0);

  const formDisabled = false;

  return (
    <form action={formAction}>
      {/* <!-- Welcome back, ol' hidden friend --> */}
      <input type={"hidden"} name="recipeId" value={recipeId} />
      <h2 className={"mb-4 font-space text-3xl font-bold"}>Your opinion?</h2>
      <div
        className={
          "mb-8 rounded-2xl border border-dotted border-gray-300 bg-white p-8 font-inter text-gray-500 hover:border-solid"
        }
      >
        <div className={"mb-4 font-medium"}>Your name:</div>

        <div className={"mb-8"}>
          <Input
            disabled={formDisabled}
            name={"commenter"}
            className={
              "rounded-lg border-gray-300 pb-6 pt-6 hover:outline hover:outline-orange_2 focus:outline focus:outline-orange_2"
            }
          />
        </div>

        <div className={"mb-4 font-medium"}>Your rating:</div>

        <div className={"mb-8"}>
          <RatingInput
            stars={stars}
            onStarsChange={setStars}
            disabled={formDisabled}
          />
        </div>

        <div className={"mb-4 font-medium"}>Your comment:</div>
        <div className={"mb-2"}>
          <Textarea
            rows={4}
            name={"comment"}
            className={
              "rounded-lg border-gray-300 pb-6 pt-3 focus:outline focus:outline-orange_2"
            }
            onChange={(e) => setCommentLength(e.target.value.length)}
            disabled={formDisabled}
          />
        </div>
        <div className={"mb-4 flex w-full items-center"}>
          <span
            className={twMerge("text-sm", commentLength > 500 && "text-red")}
          >
            {commentLength}/500 characters
          </span>
        </div>
        <div>
          <ButtonBar align={"end"}>
            <Button disabled={formDisabled}>
              <button type={"submit"} disabled={formDisabled}>
                Submit Rating
              </button>
            </Button>
          </ButtonBar>
        </div>
        {formState.result === "success" && (
          <div>
            <div className={"mt-4 font-medium text-green"}>
              Thanks for your submission!
            </div>
          </div>
        )}
        {formState.result === "error" && (
          <div>
            <div className={"mt-4 font-medium text-red"}>
              {formState.message}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
