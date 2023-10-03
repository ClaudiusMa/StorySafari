

import React, { useState } from 'react';
import Modal from 'react-modal';
import targetUrl from '../../Utility/targeturl';

Modal.setAppElement('#__next');

const CustomModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${targetUrl}/api/saveData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, payment })
    });

    const data = await response.json();

    if (response.ok) {
      setEmail("");
      setPayment("");
      onClose();
    } else {
      console.log(data);
    }
  };

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Join Waitlist"
      className="border-none outline-none w-5/6 md:w-2/5  mx-auto"
      overlayClassName="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col bg-white px-10 rounded-xl py-20 drop-shadow-2xl'>
          <p className='font-semibold text-center text-2xl'>Join Feebackly Waitlist</p>

          <label className='mt-10'>
            <p className='text-lg'>What&aposs your email?</p>
            <input type="email"
            className='w-full mt-2 p-2 rounded-xl border border-slate-200 focus:border-slate-500'  
            placeholder='Your email address'
            value={email} onChange={e => setEmail(e.target.value)} required />
          </label>

          <label className='mt-5'>
            <p className='text-lg'>How much are you willing to pay for a constructive feedback?</p>
            <input type="number" 
            className='w-full mt-2 p-2 rounded-xl border border-slate-200 focus:border-slate-500' 
            placeholder='e.g. 10'
            value={payment} onChange={e => setPayment(e.target.value)} />
          </label>

          <button className='mt-20 w-2/3 self-center'>Done!</button>
        </div>
      </form>
    </Modal>
  );
}

export default CustomModal;
