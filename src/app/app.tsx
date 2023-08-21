// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import React, { useState, useEffect } from 'react';

import * as HF from '../api/hfApi';
import TabbedContainer from './tabs';
import Artifex from './tellus-apps/artifex';
import Chatbot from './tellus-apps/chatbot';

export function App() {
  const tabs = [
    { title: 'Artifex', component: <Artifex /> },
    { title: 'ChatBot', component: <Chatbot /> },
  ];

  return (
    <div>
      <TabbedContainer tabs={tabs} />
    </div>
  );
}

export default App;
