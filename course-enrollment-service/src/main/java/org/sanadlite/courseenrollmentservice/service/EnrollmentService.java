package org.sanadlite.courseenrollmentservice.service;

import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.sanadlite.courseenrollmentservice.dto.EnrollmentRequestDto;
import org.sanadlite.courseenrollmentservice.feign.courseservice.CourseInterface;
import org.sanadlite.courseenrollmentservice.feign.courseservice.CourseResponseDto;
import org.sanadlite.courseenrollmentservice.feign.courseservice.CourseUpdateDto;
import org.sanadlite.courseenrollmentservice.model.Enrollment;
import org.sanadlite.courseenrollmentservice.repository.EnrollmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
@Log
public class EnrollmentService {
    private EnrollmentRepository enrollmentRepository;
    private CourseInterface courseInterface;
    private ModelMapper modelMapper;
    private KafkaTemplate<String, String> kafkaTemplate;

    public Enrollment addEnrollment(EnrollmentRequestDto enrollmentRequestDto) {
        ResponseEntity<CourseResponseDto> courseResponse = courseInterface.getCourseById(enrollmentRequestDto.getCourseId());
        // if course is not present don't create enrollment
        if (courseResponse.getStatusCode() == HttpStatusCode.valueOf(404))
            return null;

        // if capacity exceeded don't create enrollment
        if(courseResponse.getBody().getEnrollmentsNumber() >= courseResponse.getBody().getMaxCapacity()
                && courseResponse.getBody().getMaxCapacity() != -1)
            return null;

        // if exact enrollment exists don't create enrollment
        if(enrollmentRepository.findByCourseIdAndAndStudentUUID(enrollmentRequestDto.getCourseId(),
                enrollmentRequestDto.getStudentUUID()).isPresent())
            return null;

        Enrollment enrollment = new Enrollment();
        modelMapper.map(enrollmentRequestDto, enrollment);
        return enrollmentRepository.save(enrollment);
    }

    public Boolean acceptEnrollment(Long enrollmentId) {
        Optional<Enrollment> enrollment = enrollmentRepository.findById(enrollmentId);
        if(enrollment.isPresent()){
            // if enroll accepted, don't delete
            if (enrollment.get().getStatus() == 1 || enrollment.get().getStatus() == 0)
                return false;
            else {
                Enrollment enrollment1 = enrollment.get();
                enrollment1.setStatus(1);
                enrollmentRepository.save(enrollment1);
                ResponseEntity<CourseResponseDto> courseResponse = courseInterface.getCourseById(enrollment1.getCourseId());
                log.info(courseResponse.getBody().toString());
                ResponseEntity<?> res = courseInterface.updateCourse(courseResponse.getBody().getId(), new CourseUpdateDto(courseResponse.getBody().getEnrollmentsNumber()+1));
                log.info(res.getBody().toString());
                kafkaTemplate.send("notifications","Accepted enrollment of course "+enrollment1.getCourseId() + " for student " + enrollment1.getStudentUUID());
                return true;
            }
        } else return false;
    }

    public Boolean rejectEnrollment(Long enrollmentId) {
        Optional<Enrollment> enrollment = enrollmentRepository.findById(enrollmentId);
        if(enrollment.isPresent()){
            // if enroll accepted, don't delete
            if (enrollment.get().getStatus() == 1 || enrollment.get().getStatus() == 0)
                return false;
            else {
                Enrollment enrollment1 = enrollment.get();
                enrollment1.setStatus(0);
                enrollmentRepository.save(enrollment1);
                kafkaTemplate.send("notifications","Accepted enrollment of course "+enrollment1.getCourseId() + " for student " + enrollment1.getStudentUUID());
                return true;
            }
        } else return false;
    }


    public Page<Enrollment> enrollmentSearch(Long courseId, String studentUUID, Integer status, Pageable pageable) {
        return enrollmentRepository.search(courseId, studentUUID, status, pageable);
    }
}
