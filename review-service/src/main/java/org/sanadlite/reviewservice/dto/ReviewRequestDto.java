package org.sanadlite.reviewservice.dto;

public class ReviewRequestDto {
    private Long courseId;
    private Long studentId;
    private Double rating;
    private String review;

    public ReviewRequestDto() {
    }

    public ReviewRequestDto(Long courseId, Long studentId, Double rating, String review) {
        this.courseId = courseId;
        this.studentId = studentId;
        this.rating = rating;
        this.review = review;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
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
