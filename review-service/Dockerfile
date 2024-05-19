FROM tomcat:latest

RUN rm -rf /usr/local/tomcat/webapps/*

COPY target/review-service-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8181
