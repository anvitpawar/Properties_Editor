// src/main/java/com/example/propertieseditor/model/PropertiesFile.java

package com.anvit.properties_editor.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "properties")
public class propertyFile {

    @Id
    private String id;
    private Map<String, String> properties;

    public propertyFile() {}

    public propertyFile(String id, Map<String, String> properties) {
        this.id = id;
        this.properties = properties;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }
}