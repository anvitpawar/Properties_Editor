import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const EditorPage = () => {
    const { reqId } = useParams();
    const [properties, setProperties] = useState({});
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    const [editKey, setEditKey] = useState(null);
    const [showNewPair, setShowNewPair] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        displayPropertiesFile();
    }, [reqId]);

    const displayPropertiesFile = async () => {
        try {
            const response = await axios.get(`${process.env.MICROSERVICE_URL}/api/v1/getPropertiesTemplate/CDMPPROP`, {
                headers: generateSearHeader(appGlobalState)
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setProperties(response.data.templateObjList[0].json);

            const response1 = await axios.get(`${process.env.MICROSERVICE_URL}/api/v1/searchRequirementForReqID/${location.state}`, {
                headers: generateSearHeader(appGlobalState)
            });

            if (response1.status !== 200) {
                throw new Error(`HTTP error from response1! Status: ${response1.status}`);
            }

            let requirement = {
                requirementId: response1.data[0].requirementId,
                parameters: response.data.templateObjList[0].json,
                fileName: response1.data[0].tableName
            };

            setFormData(requirement);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const handleEdit = async (key, newKey, value) => {
        if (key === newKey) {
            setProperties(prev => ({ ...prev, [key]: value }));
        } else {
            const updatedProperties = {};
            Object.entries(properties).forEach(([k, v]) => {
                updatedProperties[k === key ? newKey : k] = v;
            });
            setProperties(updatedProperties);
        }

        try {
            const requirement = { ...formData, parameters: properties };
            setFormData(requirement);
            await axios.post(`${process.env.MICROSERVICE_URL}/api/v1/createCDMPPropFile`, requirement);
            alert("File successfully edited");
        } catch (error) {
            console.error("Error updating property:", error);
        }
    };

    const handleAddPair = async () => {
        if (newKey.trim() && newValue.trim()) {
            const updatedProperties = { ...properties, [newKey]: newValue };
            setProperties(updatedProperties);
            setNewKey("");
            setNewValue("");
            setShowNewPair(false);

            try {
                const requirement = { ...formData, parameters: updatedProperties };
                setFormData(requirement);
                await axios.post(`${process.env.MICROSERVICE_URL}/api/v1/createCDMPPropFile`, requirement);
                alert("Pair successfully added");
            } catch (error) {
                console.error("Error adding property:", error);
            }
        }
    };

    const handleDeletePair = async (key) => {
        const updatedProperties = { ...properties };
        delete updatedProperties[key];
        setProperties(updatedProperties);

        try {
            const requirement = { ...formData, parameters: updatedProperties };
            setFormData(requirement);
            await axios.post(`${process.env.MICROSERVICE_URL}/api/v1/createCDMPPropFile`, requirement);
            alert("Pair successfully deleted");
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    return (
        <div style={{ display: 'flex', padding: '20px', backgroundColor: 'white', minHeight: '100vh' }}>
            <div style={{ flex: 1, padding: '20px' }}>
                <h2 style={{ color: 'black' }}>Properties Editor - Request ID: {reqId}</h2>
                {Object.entries(properties).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={editKey === key ? newKey : key}
                            onChange={(e) => { setEditKey(key); setNewKey(e.target.value); }}
                            onBlur={() => handleEdit(key, newKey, value)}
                            style={{ flex: 1, padding: '5px', marginRight: '10px', backgroundColor: 'white', color: 'black' }}
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleEdit(key, key, e.target.value)}
                            style={{ flex: 2, padding: '5px', marginRight: '10px', backgroundColor: 'white', color: 'black' }}
                        />
                        <button onClick={() => handleDeletePair(key)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer' }}>␡</button>
                    </div>
                ))}
                <button onClick={() => setShowNewPair(true)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer' }}>+</button>
                {showNewPair && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input type="text" placeholder="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} style={{ flex: 1, padding: '5px', marginRight: '10px', backgroundColor: 'white', color: 'black' }} />
                        <input type="text" placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ flex: 2, padding: '5px', marginRight: '10px', backgroundColor: 'white', color: 'black' }} />
                        <button onClick={handleAddPair} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer' }}>Add</button>
                    </div>
                )}
            </div>
            <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc', backgroundColor: '#f5f5f5', color:'black' }}>
                <h2 style={{ color: 'black' }}>Preview</h2>
                <div>
                    {Object.entries(properties).map(([key, value]) => (<p key={key}><strong>{key}:</strong> {value}</p>))}
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
