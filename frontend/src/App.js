import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    vid: '',
    telegramId: '',
    simbreefLink: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/users/subscribe', formData);
      setMessage('✅ Subscription created successfully! You will receive notifications on Telegram.');
      setFormData({ vid: '', telegramId: '', simbreefLink: '' });
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>✈️ IVAO Copilot</h1>
          <p>Get notified when ATCs come online on your route</p>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="vid">IVAO VID</label>
            <input
              type="text"
              id="vid"
              name="vid"
              placeholder="Your IVAO VID (e.g., 123456)"
              value={formData.vid}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telegramId">Telegram ID</label>
            <input
              type="text"
              id="telegramId"
              name="telegramId"
              placeholder="Your Telegram ID or Chat ID"
              value={formData.telegramId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="simbreefLink">SimBrief Flight Plan Link</label>
            <input
              type="url"
              id="simbreefLink"
              name="simbreefLink"
              placeholder="https://www.simbrief.com/api/xml.fetcher.php?username=..."
              value={formData.simbreefLink}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Start Monitoring'}
          </button>
        </form>

        {message && <div className="message">{message}</div>}

        <section className="info">
          <h2>How it works</h2>
          <ol>
            <li>Enter your IVAO VID (pilot ID)</li>
            <li>Add your Telegram ID to receive notifications</li>
            <li>Link your SimBrief flight plan</li>
            <li>Receive real-time notifications when ATCs come online on your route!</li>
          </ol>
        </section>
      </div>
    </div>
  );
}

export default App;
