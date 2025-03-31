// src/main/java/com/example/propertieseditor/repository/PropertiesRepository.java

package com.anvit.properties_editor.repository;

import com.anvit.properties_editor.model.propertyFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface propertyRepository extends MongoRepository<propertyFile, String> {
}