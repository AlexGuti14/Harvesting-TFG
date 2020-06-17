package com.backend.demo.batch.repository;

import com.backend.demo.batch.model.Animal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnimalRepository extends MongoRepository<Animal, Long> {
}