import React from 'react';
import dynamic from 'next/dynamic';

const ModernIDE = dynamic(() => import('../components/ModernIDE'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-xl animate-pulse">Loading IDE...</p>
    </div>
  ),
});

function Home() {
  return <ModernIDE />;
}

export default Home;