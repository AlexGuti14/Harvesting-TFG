package com.backend.demo.batch.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.demo.batch.model.EuropePork;

public interface EuropeRepository extends MongoRepository<EuropePork, Long>{
}