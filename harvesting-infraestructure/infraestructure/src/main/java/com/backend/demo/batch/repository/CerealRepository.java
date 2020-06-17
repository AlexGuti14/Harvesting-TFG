package com.backend.demo.batch.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.demo.batch.model.Cereal;

public interface CerealRepository extends MongoRepository<Cereal, Long> {
}
