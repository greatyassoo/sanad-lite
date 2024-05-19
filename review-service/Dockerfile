FROM maven:3.8.5-openjdk-17 as maven_builder

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package
#COPY . .
#
#ADD pom.xml .
#
#RUN ["/usr/local/bin/mvn-entrypoint.sh", "mvn", "verify", "clean", "--fail-never"]
#
#RUN ["mvn","clean","install","-T","2C","-DskipTests=true"]

FROM tomcat:10.1.24-jdk17

COPY --from=maven_builder /app/target/review-service-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/

EXPOSE 8181
