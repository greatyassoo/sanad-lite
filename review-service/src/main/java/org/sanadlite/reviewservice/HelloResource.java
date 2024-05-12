package org.sanadlite.reviewservice;

import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import org.sanadlite.reviewservice.model.Review;
import org.sanadlite.reviewservice.service.ReviewService;

@Path("/hello-world")
@Stateless // TODO: NOTE HERE
public class HelloResource {
    @Inject
    private ReviewService reviewService;
    @GET
    @Produces("text/plain")
    public String hello() {
//        Review review = new Review(1L, 1L, 5.0, "review test");
//
//        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
//        EntityManager em = emf.createEntityManager();
//        em.getTransaction().begin();
//        em.persist(review);
//        em.getTransaction().commit();
//        em.close();
//        emf.close();

        return reviewService.test();
    }
}