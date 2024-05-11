package com.sanadlite.courseservice.repository;

import com.sanadlite.courseservice.model.StudentCourse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.logging.Logger;

@Repository
public interface StudentCourseRepository extends CrudRepository<StudentCourse,Long> {
}
