import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const BackToTopDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-xl bg-white/20 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-0';
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates(prev => ({ ...prev, [key]: false })),
        2000,
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-black' />
      )}
    </button>
  );

  const backToTopCode = `
    const getGlassyClasses = () => {
        return 'backdrop-filter backdrop-blur-xl bg-white/20 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-0';
    };

    function BackToTopButton() {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScroll}
      className="fixed bottom-5 right-5 py-3 px-5 bg-blue-500 rounded-full text-white shadow-lg transition-transform hover:scale-105"
      title="Back to Top"
    >
      ↑
    </button>
  );
}`;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-br from-pink-300 to-pink-300 text-gray-800 relative'>
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center bg-amber-200 border border-black rounded-xl shadow-lg  max-sm:px-0 px-4 py-2 hover:bg-white/40 transition-all duration-300 text-black`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-black'>
          Back to Top Button
        </h1>
        <p className='text-xl mb-8 text-black'>
          A simple button to scroll back to the top of the page.
        </p>

        <div className={`border rounded-lg bg-pink-200 p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-black'>Basic Usage</h2>
          <div className='relative'>
            <pre className='bg-lime-200 text-black p-6 rounded-lg overflow-x-auto blackspace-pre-wrap max-sm:text-[0.55rem]'>
              {backToTopCode}
            </pre>
            <CopyButton text={backToTopCode} codeKey='backToTop' />
          </div>
        </div>

        <div className={`border rounded-lg bg-pink-200 p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-black'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-black'>
                  <th className='text-left p-2 text-black'>Prop</th>
                  <th className='text-left p-2 text-black'>Type</th>
                  <th className='text-left p-2 text-black'>Default</th>
                  <th className='text-left p-2 text-black'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-black'>
                  <td className='p-2 text-black'>onClick</td>
                  <td className='p-2 text-black'>function</td>
                  <td className='p-2 text-black'>-</td>
                  <td className='p-2 text-black'>
                    Function to execute when the button is clicked
                  </td>
                </tr>
                <tr className='border-b border-black'>
                  <td className='p-2 text-black'>title</td>
                  <td className='p-2 text-black'>string</td>
                  <td className='p-2 text-black'>"Back to Top"</td>
                  <td className='p-2 text-black'>
                    Tooltip text when hovering over the button
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`border rounded-lg bg-pink-200 p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-black'>Customization</h2>
          <p className='mb-6 text-lg text-black'>
            Customize the button's style through the className prop or inline
            styles.
          </p>
          <button
            className={`fixed bottom-5 right-5 py-3 px-5 bg-blue-500 rounded-full text-white shadow-lg transition-transform hover:scale-105`}
            title='Back to Top'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackToTopDetailsPage;
