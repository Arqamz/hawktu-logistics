import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState("");

    const fetchMessage = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/message');
            setMessage(response.data.content);
        } catch (error) {
            console.error("Error fetching message", error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Integration test</h1>
            <button onClick={fetchMessage}>Fetch Message</button>
            <p>{message}</p>
        </div>
    );
}

export default App;