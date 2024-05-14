package org.sanadlite.reviewservice.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;
import org.sanadlite.reviewservice.dto.ReviewRequestDto;
import org.sanadlite.reviewservice.model.Review;

import java.util.List;

@ApplicationScoped
public class ReviewService {
    @Inject
    private EntityManager entityManager;

    public Review createReview(ReviewRequestDto reviewRequestDto) {
        Review review = new Review(
                reviewRequestDto.getCourseId(),
                reviewRequestDto.getStudentUUID(),
                reviewRequestDto.getRating(),
                reviewRequestDto.getReview()
        );

        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();
            entityManager.persist(review);
            transaction.commit();
            return review;
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
    }

    public List<Review> getReviewsByCourseId(Long courseId) {
        Query query = entityManager.createNamedQuery("Review.getReviewsByCourseId");
        query.setParameter("courseId", courseId);
        return query.getResultList();
    }

    public Boolean deleteReviewByCourseId(Long courseId) {
        if (getReviewsByCourseId(courseId).isEmpty())
            return false;

        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            Query query = entityManager.createNamedQuery("Review.deleteReviewByCourseId");
            query.setParameter("courseId", courseId);
            query.executeUpdate();
            transaction.commit();

            return true;
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
    }


}
