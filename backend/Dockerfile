# --- ÉTAPE 1 : Build ---
# On utilise une image JDK (Java Development Kit) pour compiler
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# On copie d'abord les fichiers de configuration Gradle pour mettre en cache les dépendances
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# On donne les droits d'exécution au wrapper Gradle
RUN chmod +x gradlew

# On télécharge les dépendances (cette étape est mise en cache si les fichiers gradle ne changent pas)
RUN ./gradlew dependencies --no-daemon

# On copie le code source et on build le projet
COPY src src
RUN ./gradlew bootJar --no-daemon

# --- ÉTAPE 2 : Runtime ---
# On utilise une image JRE (Java Runtime Environment) beaucoup plus légère
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# On ne récupère que le fichier JAR généré à l'étape précédente
COPY --from=build /app/build/libs/*.jar app.jar

# Port par défaut de Spring Boot
EXPOSE 8080

# Commande de lancement
ENTRYPOINT ["java", "-jar", "app.jar"]