package org.sanadlite.reviewservice.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import org.sanadlite.reviewservice.model.Review;

@ApplicationScoped
public class ReviewService {
    @Inject
    private EntityManager entityManager;
    public String test() {
        Review review = new Review(2L, 2L, 5.0, "review test 2");

        entityManager.getTransaction().begin();
        entityManager.persist(review);
        entityManager.getTransaction().commit();
        return "Hello, World!";
    }
}
