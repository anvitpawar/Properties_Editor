import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [reqId, setReqId] = useState("");
    const navigate = useNavigate();

    const handleNext = () => {
        if (reqId.trim()) {
            navigate(`/editor/${reqId}`);
        } else {
            alert("Enter a valid Request ID");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white' }}>
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: 'black', marginBottom: '20px' }}>Properties Editor</h2>
                <input
                    type="text"
                    placeholder="Enter Request ID"
                    value={reqId}
                    onChange={(e) => setReqId(e.target.value)}
                    style={{ padding: '10px', marginBottom: '10px', width: '300px', backgroundColor: 'white', color: 'black' }}
                />
                <button 
                    onClick={handleNext}
                    style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LandingPage;