import React, { useState } from 'react';
import { makeArt } from '../../api/hfApi';

const Artifex = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const result = await makeArt(input);

    setOutput(URL.createObjectURL(result));
    setLoading(false);
  };

  return (
    <div className="container al-c mt-3">
      <h1>Artifex</h1>
      <p>Describe the art you would like to create!</p>
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
        {!loading && output && (
          <div className="result-image">
            <img src={output} alt="art" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Artifex;
