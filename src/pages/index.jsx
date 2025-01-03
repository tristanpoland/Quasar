import React from 'react';
import dynamic from 'next/dynamic';

const ModernIDE = dynamic(() => import('../components/ModernIDE'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      Loading IDE...
    </div>
  ),
});

function Home() {
  return <ModernIDE />;
}

export default Home;