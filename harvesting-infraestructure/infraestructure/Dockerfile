FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} harvesting.jar
RUN mkdir -p files2020
ENTRYPOINT ["java","-jar","/harvesting.jar"]