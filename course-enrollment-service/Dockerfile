FROM maven:3.8.5-openjdk-17 as maven_builder

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests

RUN mv target/course-enrollment-service-0.0.1-SNAPSHOT.jar target/course_enrollment_service.jar


FROM openjdk:17-jdk

COPY --from=maven_builder /app/target/course_enrollment_service.jar /target/

# RUN addgroup -S spring && adduser -S spring -G spring

# USER spring:spring

ENTRYPOINT ["java","-jar","/target/course_enrollment_service.jar"]