// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BulkPdfUploader from './pages/BulkPdfUploader';
import PanPdfDownloader from './pages/PanPdfDownloader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dinoop/*879*/547125/!/" element={<BulkPdfUploader />} />
        <Route path="/" element={<PanPdfDownloader />} />
      </Routes>
    </Router>
  );
}

export default App;
