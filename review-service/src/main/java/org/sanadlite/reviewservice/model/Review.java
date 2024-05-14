package org.sanadlite.reviewservice.model;

import jakarta.persistence.*;
@Entity
@NamedQueries({
        @NamedQuery(name = "Review.getReviewsByCourseId",
                query = "SELECT r FROM Review r WHERE r.courseId = :courseId"),
        @NamedQuery(name = "Review.deleteReviewByCourseId",
                query = "DELETE FROM Review r WHERE r.courseId = :courseId"),

})
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_id_seq")
    private Long id;
    @Column(name = "course_id")
    private Long courseId;
    @Column(name = "student_uuid")
    private String studentUUID;
    private Double rating;
    private String review;

    public Review(Long id, Long courseId, String studentUUID, Double rating, String review) {
        this.id = id;
        this.courseId = courseId;
        this.studentUUID = studentUUID;
        this.rating = rating;
        this.review = review;
    }

    public Review(Long courseId, String studentUUID, Double rating, String review) {
        this.courseId = courseId;
        this.studentUUID = studentUUID;
        this.rating = rating;
        this.review = review;
    }

    public Review() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setStudentUUID(String studentId) {
        this.studentUUID = studentId;
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

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", courseId=" + courseId +
                ", studentId=" + studentUUID +
                ", rating=" + rating +
                ", review='" + review + '\'' +
                '}';
    }
}
