package org.sanadlite.courseenrollmentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CourseEnrollmentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CourseEnrollmentServiceApplication.class, args);
    }

}
