import {IReview} from '../../../../interfaces/users.interface';

export function calculateAverageRating(reviews: IReview[] = []): number {
  if (!reviews || reviews.length === 0) {
    return 0; // Return 0 if there are no reviews or if the reviews array is not defined
  }

  // Calculate the sum of all ratings in the reviews
  const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0);

  // Calculate the average rating
  const averageRating = totalRating / reviews.length;

  return averageRating;
}
