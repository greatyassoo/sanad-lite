package org.sanadlite.courseenrollmentservice.repository;

import org.sanadlite.courseenrollmentservice.dto.EnrollmentRequestDto;
import org.sanadlite.courseenrollmentservice.model.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends CrudRepository<Enrollment, Long>,
        PagingAndSortingRepository<Enrollment, Long>, ListPagingAndSortingRepository<Enrollment, Long> {
    Optional<Enrollment> findByCourseIdAndAndStudentUUID(Long courseId, String studentUUID);

    @Query("SELECT e FROM Enrollment e WHERE (:courseId IS NULL OR e.courseId = :courseId) " +
            "AND (:studentUUID IS NULL OR e.studentUUID = :studentUUID) " +
            "AND (:status IS NULL OR e.status = :status)")
    Page<Enrollment> search(Long courseId, String studentUUID, Integer status, Pageable pageable);
}
