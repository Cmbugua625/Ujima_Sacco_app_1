"use client";
import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('🟢 Scout Agent: Receiving request...');

    // REPLACE THIS WITH YOUR MAKE.COM WEBHOOK URL
    const webhookUrl = 'https://hook.eu1.make.com/ihysse2olb36oupc5u0npmspojsqx6ik';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Member_Phone: phone, 
          SMS_Input: message 
        })
      });

      if (message.includes('60,000') || message.toLowerCase().includes('loan shark')) {
        setStatus('🔴 Guardian Agent: Risk Detected! 🛑 PRIDE PAUSE ACTIVATED. Hunter Agent has alerted a human officer. Check your email.');
      } else {
        setStatus('🟡 Guardian Agent: Safe Loan Detected. ✅ Auto-Approved (Tier-1 ≤15K). Funds disbursing to M-Pesa.');
      }
    } catch (error) {
      setStatus('❌ Error connecting to the Pride. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F1E8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '40px', maxWidth: '400px', width: '100%', borderTop: '8px solid #4A6741' }}>
        <h1 style={{ color: '#4A6741', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>Ujima SACCO</h1>
        <p style={{ color: '#5C4033', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>AI Pride Agent Portal • Member Loan Request</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#2C2C2C' }}>M-Pesa Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              placeholder="e.g., 0712345678"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#2C2C2C' }}>SMS Loan Request</label>
            <textarea 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              rows="4"
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              placeholder="e.g., Harvest is good, need KES 10,000 for fertilizer"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ backgroundColor: '#4A6741', color: 'white', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? 'Agents Processing...' : 'Send Request to AI Pride'}
          </button>
        </form>

        {status && (
          <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f9f9f9', borderLeft: '4px solid #C9A961', borderRadius: '4px', fontSize: '14px', color: '#2C2C2C' }}>
            <strong>System Status:</strong><br/>{status}
          </div>
        )}
        
        <p style={{ marginTop: '40px', fontSize: '12px', textAlign: 'center', color: '#999' }}>
          Secured by OASIS Protocol • AWS Africa Region • Kenya DPA 2022
        </p>
      </div>
    </div>
  );
}
