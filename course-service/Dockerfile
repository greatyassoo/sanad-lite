FROM maven:3.8.5-openjdk-17 as maven_builder

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean install

CMD ["mvn", "spring-boot:run"]

