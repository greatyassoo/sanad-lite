package org.sanadlite.reviewservice.controller;

import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.sanadlite.reviewservice.model.Review;
import org.sanadlite.reviewservice.service.ReviewService;

import java.io.PrintWriter;
import java.io.StringWriter;

@Path("/reviews")
@Stateless // TODO: STATELESS HERE
public class ReviewController {
    @Inject
    private ReviewService reviewService;
    @POST
    @Produces("application/json")
    public Response createReview(@QueryParam("course_id") Long courseId,
                                 @QueryParam("student_id")Long studentId,
                                 @QueryParam("rating") Double rating,
                                 @QueryParam("review") String review) {
        Review reviewObj = new Review(courseId, studentId, rating, review);
        try {
            reviewService.createReview(reviewObj);
            return Response.status(Response.Status.CREATED)
                    .entity(reviewObj)
                    .build();
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();

            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(exceptionAsString)
                    .build();
        }
    }
}