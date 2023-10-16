import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosError } from 'axios';
import Sidebar from './components/Sidebar';
import BlocksWrapper from './components/BlocksWrapper';
import { ImageBlockInterface, TextBlockInterface } from './interfaces';

function App() {
  const [apiAvailable, setApiAvailable] = useState<boolean | undefined>(
    undefined,
  );

  const [textBlockData, setTextBlockData] = useState<
    TextBlockInterface [] 
  >([]);

  const [imageBlockData, setImageBlockData] = useState<
     ImageBlockInterface[] 
  >([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [inputType, setInputType] = useState<'' | 'text' | 'image' | 'editText'>('');

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchTextBlocks = async () => {
    try {
      const textBlocks = await axios.get('/api/textblocks');
      setTextBlockData(textBlocks.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response && axiosError.response.status === 404) {
            console.log('Request to fetch text blocks returned 404:', axiosError.message);
          } else {
            console.error('An unhandled error occurred while fetching text blocks:', axiosError.message);
          }
        } else {
          console.error('Unknown error occurred:', error);
        }
    }
  };

  const fetchImageBlocks = async () => {
    try {
      const imageBlocks = await axios.get('/api/files');
      setImageBlockData(imageBlocks.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response && axiosError.response.status === 404) {
            console.log('Request to fetch image blocks returned 404:', axiosError.message);
          } else {
            console.error('An unhandled error occurred while fetching image data:', axiosError.message);
          }
        } else {
          console.error('Unknown error occurred:', error);
        }
    }
  };

  useEffect(() => {
    fetchTextBlocks();
  }, []);
  
  useEffect(() => {
    fetchImageBlocks();
  }, []);


  useEffect(() => {
    let stopped = false;

    axios
      .get('/api')
      .then(() => {
        if (stopped) return;
        setApiAvailable(true);
      })
      .catch(() => {
        if (stopped) return;
        setApiAvailable(false);
      });

    // const interval = setInterval(() => {
      axios
        .get('/api')
        .then(() => {
          setApiAvailable(true);
        })
        .catch(() => {
          setApiAvailable(false);
        });
    // }, 1000);

    return () => {
      stopped = true;
      // clearInterval(interval);
    };
  });

  const data = [...textBlockData, ...imageBlockData];
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="bg-light duration-500">
      <Sidebar
        setInputType={setInputType}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <BlocksWrapper
        blocks={data}
        inputType={inputType}
        isSidebarOpen={isSidebarOpen}
        fetchImageBlocks={fetchImageBlocks}
        fetchTextBlocks={fetchTextBlocks}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}

      />
      <div
        className={`fixed bottom-0  right-0 px-28 py-2 text-center ${
          apiAvailable ? 'bg-green-200' : 'bg-pink-300'
        } `}
      >
        API Status:{' '}
        {apiAvailable === undefined
          ? '⏳'
          : apiAvailable
          ? '✅ Available'
          : '❌ Unavailable'}
      </div>
    </div>
  );
}

export default App;
