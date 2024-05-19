# Use the official Maven image to create a build artifact.
FROM maven:3.8.1-openjdk-17 AS build

# Set the working directory in the container.
WORKDIR /app

# Copy the pom.xml file and the source code to the container.
COPY pom.xml .
COPY src ./src

# Build the project.
RUN mvn clean package -DskipTests

# Use the official OpenJDK image to create a container that can run the application.
FROM openjdk:17-jdk-slim

# Set the working directory in the container.
WORKDIR /app

# Copy the build artifact from the build stage.
COPY --from=build /app/target/*.jar app.jar

# Specify the command to run the application.
ENTRYPOINT ["java", "-jar", "app.jar"]