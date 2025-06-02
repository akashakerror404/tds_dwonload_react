import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BulkPdfUploader from './pages/BulkPdfUploader';
import PanPdfDownloader from './pages/PanPdfDownloader';
import { Analytics } from "@vercel/analytics/react";
import Test from './pages/Test';

function App() {
  const isSiteReachable = true; // change to true to hide routes and show message

  return (
    <>
      {isSiteReachable ? (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-semibold text-red-600">Site Not Reachable</h1>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/dinoop/*879*/547125/!/" element={<BulkPdfUploader />} />
            {/* <Route path="/" element={<PanPdfDownloader />} /> */}
            <Route path="/" element={<Test />} />
          </Routes>
        </Router>
      )}
      <Analytics />
    </>
  );
}

export default App;
