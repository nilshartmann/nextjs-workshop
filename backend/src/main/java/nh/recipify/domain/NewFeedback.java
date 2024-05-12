package nh.recipify.domain;

import jakarta.validation.constraints.*;

public record NewFeedback(@NotBlank @Size(min = 3) String commenter,
                          @NotNull @Min(0) @Max(5) int stars,
                          @NotBlank String comment) {
}