import React, { useState } from 'react';
import { converse } from '../../api/hfApi';

const Chatbot = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await converse(input);
    setOutput(response.generated_text);
    setLoading(false);
  };

  return (
    <div className="container al-c mt-3">
      <h1>chatbot</h1>
      <p>Ask me a question!</p>
      <form className="gen-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="type your prompt here..."
        />
        <button type="submit">Generate</button>
      </form>
      <div>
        {loading && <div className="loading">Loading...</div>}
        {!loading && output && <div>{output}</div>}
      </div>
    </div>
  );
};

export default Chatbot;
