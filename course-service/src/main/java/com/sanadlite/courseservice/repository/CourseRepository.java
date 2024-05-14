package com.sanadlite.courseservice.repository;

import com.sanadlite.courseservice.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    @Query("SELECT c FROM Course c " +
            "WHERE (:instructorId IS NULL OR c.instructorId = :instructorId) " +
            "AND (LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Course> findCoursesCustom(@Param("instructorId") String instructorId, @Param("search") String search, Pageable pageable);
    Page<Course> findByInstructorIdOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String instructorId, String name, String description, Pageable pageable);
}
