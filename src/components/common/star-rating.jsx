import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      className={`p-2 rounded-full transition-colors ${
        star <= rating
          ? "text-amber-500 hover:bg-amber-500" // Amber for selected stars
          : "text-gray-500 hover:bg-primary hover:text-primary-foreground" // Neutral gray and primary hover for unselected
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-amber-500" : "fill-gray-500" // Amber for selected, gray for unselected
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
