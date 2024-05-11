package com.sanadlite.courseservice.repository;

import com.sanadlite.courseservice.model.CourseContent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseContentRepository extends CrudRepository<CourseContent,Long> {
}
