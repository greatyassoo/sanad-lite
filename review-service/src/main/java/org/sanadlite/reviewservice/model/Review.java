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
    @Column(name = "student_id")
    private Long studentId;
    private Double rating;
    private String review;

    public Review(Long id, Long courseId, Long studentId, Double rating, String review) {
        this.id = id;
        this.courseId = courseId;
        this.studentId = studentId;
        this.rating = rating;
        this.review = review;
    }

    public Review(Long courseId, Long studentId, Double rating, String review) {
        this.courseId = courseId;
        this.studentId = studentId;
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

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", courseId=" + courseId +
                ", studentId=" + studentId +
                ", rating=" + rating +
                ", review='" + review + '\'' +
                '}';
    }
}
