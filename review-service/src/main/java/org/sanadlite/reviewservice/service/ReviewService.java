package org.sanadlite.reviewservice.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import org.sanadlite.reviewservice.model.Review;

@ApplicationScoped
public class ReviewService {
    @Inject
    private EntityManager entityManager;

    public void createReview(Review review) {
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();
            entityManager.persist(review);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
    }
}
