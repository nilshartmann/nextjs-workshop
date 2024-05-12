package nh.recipify.domain;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import nh.recipify.domain.model.Feedback;
import nh.recipify.domain.model.FeedbackRepository;
import nh.recipify.domain.model.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class FeedbackService {

    private static final Logger log = LoggerFactory.getLogger(FeedbackService.class);
    private final RecipeRepository recipeRepository;
    private final FeedbackRepository feedbackRepository;

    public FeedbackService(RecipeRepository recipeRepository, FeedbackRepository feedbackRepository) {
        this.recipeRepository = recipeRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @Transactional
    public Feedback addFeedback(long recipeId, @Valid @NotNull NewFeedback feedbackData) {
        var recipe = recipeRepository.findById(recipeId).orElseThrow(
            () -> new EntityNotFoundException("No recipe " + recipeId + " found."));

        var newFeedback = new Feedback(
            recipe,
            feedbackData.commenter(),
            feedbackData.stars(),
            feedbackData.comment()
        );

        return feedbackRepository.save(newFeedback);

    }

    @Transactional
    public int increaseLikes(long recipeId) {
        var recipe = recipeRepository.findById(recipeId).orElseThrow(
            () -> new EntityNotFoundException("No recipe " + recipeId + " found."));

        var oldLikes = recipe.getLikes();

        recipe.likeRecipe();

        var newLikes = recipeRepository.save(recipe).getLikes();

        log.info("Increased likes for reipce '{}' - old: {}, new: {}", recipeId, oldLikes, newLikes);

        return newLikes;
    }
}
