package org.sanadlite.courseenrollmentservice.repository;

import org.sanadlite.courseenrollmentservice.model.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollmentRepository extends CrudRepository<Enrollment, Long>,
        PagingAndSortingRepository<Enrollment, Long>, ListPagingAndSortingRepository<Enrollment, Long> {
    Page<Enrollment> findByStudentUUID(String studentUUID, Pageable pageable);
}
