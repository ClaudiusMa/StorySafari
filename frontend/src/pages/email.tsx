import { useState } from 'react';

export default function EmailForm() {
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [gratuityAmount, setGratuityAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3003/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        recruiterName,
        recruiterEmail,
        candidateName,
        gratuityAmount,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Recruiter Name</label>
        <input
          type="text"
          value={recruiterName}
          onChange={(e) => setRecruiterName(e.target.value)}
          className="block w-full p-2 border"
        />
      </div>

      <div>
        <label className="block">Recruiter Email</label>
        <input
          type="email"
          value={recruiterEmail}
          onChange={(e) => setRecruiterEmail(e.target.value)}
          className="block w-full p-2 border"
        />
      </div>

      <div>
        <label className="block">Candidate Name</label>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          className="block w-full p-2 border"
        />
      </div>

      <div>
        <label className="block">Gratuity Amount</label>
        <input
          type="number"
          value={gratuityAmount}
          onChange={(e) => setGratuityAmount(e.target.value)}
          className="block w-full p-2 border"
        />
      </div>

      <button type="submit" className="block w-full p-2 bg-blue-500 text-white">
        Send Email
      </button>
    </form>
  );
}
