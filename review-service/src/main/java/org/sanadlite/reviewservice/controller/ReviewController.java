package org.sanadlite.reviewservice.controller;

import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.sanadlite.reviewservice.dto.ReviewRequestDto;
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
     * @param reviewRequestDto review request dto
     * @return created review
     */
    @POST
    @Produces("application/json")
    public Response createReview(ReviewRequestDto reviewRequestDto) {

        try {
            reviewService.createReview(reviewRequestDto);
            return Response.status(Response.Status.CREATED)
                    .entity(reviewRequestDto)
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
    public Response getReviewsByCourseId(@QueryParam("courseId") Long courseId) {
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
    public Response deleteReviewByCourseId(@QueryParam("courseId") Long courseId){
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


    @GET
    @Path("/test")
    @Produces("application/json")
    public Response test(@QueryParam("courseId") Long courseId) {
        if(courseId % 2 != 0) {
            return Response.status(Response.Status.CREATED)
                    .entity("course_id must be even")
                    .build();
        }
        return Response.status(Response.Status.OK)
                .entity("ok")
                .build();
    }
}