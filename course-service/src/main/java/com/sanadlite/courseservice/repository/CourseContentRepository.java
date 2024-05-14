package com.sanadlite.courseservice.repository;

import com.sanadlite.courseservice.model.Course;
import com.sanadlite.courseservice.model.CourseContent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseContentRepository extends JpaRepository<CourseContent,Long> {
    Page<CourseContent> findCourseContentByCourseAndTitleContainsIgnoreCase(Course course, String title, Pageable pageable);
    Page<CourseContent> findCourseContentByCourseAndTitleContainsIgnoreCaseAndIsPublished(Course course, String title, Boolean isPublished, Pageable pageable);
}
