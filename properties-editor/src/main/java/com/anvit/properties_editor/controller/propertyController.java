
package com.anvit.properties_editor.controller;

import com.anvit.properties_editor.model.propertyFile;
import com.anvit.properties_editor.repository.propertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if using a different frontend port
public class propertyController {

    @Autowired
    private propertyRepository propertiesRepository;

    // ✅ Fetch properties by Request ID
    @GetMapping("/{id}")
    public Map<String, String> getProperties(@PathVariable String id) {
        Optional<propertyFile> propertiesFile = propertiesRepository.findById(id);
        return propertiesFile.map(propertyFile::getProperties).orElseThrow(() -> new RuntimeException("Request ID not found"));
    }

    // ✅ Update properties in MongoDB
    @PutMapping("/{id}")
    public propertyFile updateProperties(@PathVariable String id, @RequestBody Map<String, String> updatedProperties) {
        propertyFile propertiesFile = propertiesRepository.findById(id).orElse(new propertyFile(id, updatedProperties));
        propertiesFile.setProperties(updatedProperties);
        return propertiesRepository.save(propertiesFile);
    }
}