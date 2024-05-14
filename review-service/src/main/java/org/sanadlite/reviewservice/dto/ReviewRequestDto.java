package org.sanadlite.reviewservice.dto;

public class ReviewRequestDto {
    private Long courseId;
    private String studentUUID;
    private Double rating;
    private String review;

    public ReviewRequestDto() {
    }

    public ReviewRequestDto(Long courseId, String studentUUID, Double rating, String review) {
        this.courseId = courseId;
        this.studentUUID = studentUUID;
        this.rating = rating;
        this.review = review;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getStudentUUID() {
        return studentUUID;
    }

    public void setStudentUUID(String studentUUID) {
        this.studentUUID = studentUUID;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
