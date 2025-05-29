import React, { useState } from 'react';
import axios from 'axios';
import panCardImage from '../assets/10075618.jpg';

const PanPdfDownloader = () => {
    const [panNumber, setPanNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleDownload = async () => {
        if (!panNumber.trim()) {
            setError('Please enter a PAN number');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const response = await axios.get(`https://akashak.online/api/download/${panNumber.trim()}/`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            let filename = `${panNumber}.pdf`;
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();

            setSuccess(`PDF for PAN ${panNumber} downloaded successfully!`);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('PAN number not found in our records');
            } else {
                setError('Failed to download PDF. Please try again.');
            }
            console.error('Download failed', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen md:bg-gray-50 bg-blue-600 ">
            <div className="flex flex-col lg:flex-row md:px-0 px-4 md:py-0 py-0">
                {/* Left Side - Image Section */}
                <div className="lg:w-1/2 bg-blue-600 p-8 flex items-center justify-center h-screen">
                    <div className="max-w-md text-center text-white">
                        <img
                            src={panCardImage}
                            alt="PAN Card Sample"
                            className="mx-auto rounded-lg shadow-xl mb-6  object-contain"
                        />
                        <h2 className="md:text-3xl text-xl font-bold md:mb-4 mb-2">Your TDS Certificate is Ready for Download!</h2>
                        {/* <p className="text-blue-100 md:mb-6 mb-2">
                            Download your TDS Certificate PDF.
                        </p> */}
                        <div className='md:hidden flex'>
                            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">Download TDS Certificate</h2>
                                    <p className="text-xs text-gray-500">Enter PAN to download immediately</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="panNumber" className="block text-xs font-medium text-gray-700 mb-1">
                                            PAN NUMBER <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="panNumber"
                                            value={panNumber}
                                            onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                                            placeholder="ABCDE1234F"
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                            maxLength="10"
                                        />
                                        <p className="mt-1 text-[10px] text-gray-400">
                                            Format: 5 letters + 4 digits + 1 letter
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleDownload}
                                        disabled={loading}
                                        className={`w-full py-2 px-4 rounded-md text-sm font-medium text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                            } transition-colors flex items-center justify-center shadow-sm`}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Downloading...
                                            </>
                                        ) : (
                                            '  Download TDS Certificate'
                                        )}
                                    </button>

                                    {error && (
                                        <div className="p-2 bg-red-50 border-l-2 border-red-500 text-red-600 rounded text-xs flex items-start">
                                            <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    {success && (
                                        <div className="p-2 bg-green-50 border-l-2 border-green-500 text-green-600 rounded text-xs flex items-start">
                                            <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>{success}</span>
                                        </div>
                                    )}

                                    <div className="text-center text-[15px] text-gray-500 mt-4">
                                        <p>
                                            Having trouble?{" "}
                                            <a
                                                href="https://wa.me/918301089693"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline text-[15px]"
                                            >
                                                Chat with support on WhatsApp
                                            </a>
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Right Side - Download Form */}
                <div className="hidden md:flex lg:w-1/2  items-center justify-center p-8">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Download Your TDS Certificate</h2>
                            <p className="text-gray-600">Enter your PAN number to download your TDS Certificate</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    PAN Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="panNumber"
                                    value={panNumber}
                                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                                    placeholder="ABCDE1234F"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength="10"
                                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                                    title="Enter valid PAN (e.g., ABCDE1234F)"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Format: 5 letters (A-Z) + 4 digits (0-9) + 1 letter (A-Z)
                                </p>
                            </div>

                            <button
                                onClick={handleDownload}
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                    } transition-colors flex items-center justify-center shadow-md`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                        </svg>
                                        Download TDS Certificate
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                                    <div className="flex">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <p>{error}</p>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
                                    <div className="flex">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <p>{success}</p>
                                    </div>
                                </div>
                            )}

                            <div className="text-center text-sm text-gray-500 mt-4">
                                <p>
                                    Having trouble?{" "}
                                    <a
                                        href="https://wa.me/918301089693"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:underline font-medium"
                                    >
                                        Chat with support on WhatsApp
                                    </a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanPdfDownloader;