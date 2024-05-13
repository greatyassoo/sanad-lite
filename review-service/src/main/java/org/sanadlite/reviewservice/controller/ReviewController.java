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

    /**
     * Create a review
     *
     * @param courseId course id
     * @param studentId student id
     * @param rating rating
     * @param review review
     * @return created review
     */
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

    /**
     * Get reviews by course id
     *
     * @param courseId course id
     * @return list of reviews for the given course id
     */
    @GET
    @Produces("application/json")
    public Response getReviewsByCourseId(@QueryParam("course_id") Long courseId) {
        try {
            return Response.status(Response.Status.OK)
                    .entity(reviewService.getReviewsByCourseId(courseId))
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

    /**
     * Delete reviews for a given course id
     *
     * @param courseId course id
     * @return No Content if successful, Not Found if course id is not found, or Internal Server Error
     */
    @DELETE
    @Produces("application/json")
    public Response deleteReviewByCourseId(@QueryParam("course_id") Long courseId){
        try {
            if (reviewService.deleteReviewByCourseId(courseId))
                return Response.status(Response.Status.NO_CONTENT).build();
            else
                return Response.status(Response.Status.NOT_FOUND).build();
        }
        catch (Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();

            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(exceptionAsString)
                    .build();
        }
    }
}