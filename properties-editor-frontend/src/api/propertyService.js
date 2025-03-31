// src/api/propertyService.js

import axios from 'axios';

const API_URL = "http://localhost:8080/api/properties";

export const fetchProperties = (reqId) => axios.get(`${API_URL}/${reqId}`);
export const updateProperties = (reqId, properties) => axios.put(`${API_URL}/${reqId}`, properties);