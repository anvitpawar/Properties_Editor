package com.anvit.properties_editor.service;

import com.anvit.properties_editor.model.propertyFile;
import com.anvit.properties_editor.repository.propertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class propertyService {

    @Autowired
    private propertyRepository propertyRepository;

    public propertyFile getProperties(String reqId) {
        return propertyRepository.findById(reqId).orElse(new propertyFile());
    }

    public propertyFile saveProperties(propertyFile propertyFile) {
        return propertyRepository.save(propertyFile);
    }
}