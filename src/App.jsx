import { useState } from 'react'
import { Rocket, Search, HelpCircle, Calendar, Type, Info, ChevronDown, ChevronUp } from 'lucide-react'
import axios from 'axios'

import './App.css'

function App() {

  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const apiKey = import.meta.env.VITE_NASA_API_KEY;

  const handleToggle = () => { 
    
    if (image == null) { return }

    setIsOpen(!isOpen); 
    console.log(isOpen); 
  }

  const fetchData = async() => {
    
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    
    try {
      const response = await axios(URL , {
        params: {
          count: 1,
        }
      });
      setIsOpen(false);
      setImage(response.data[0]);
      console.log(response.data[0]);

    } catch(error) {
      console.log('Error', error);
    }
  }

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className='p-8 max-w-7xl mx-auto'>
        <header className='flex justify-between'>
          <div className='flex items-center'>
            <Rocket className='w-12 h-12 mr-5 text-blue-400' />
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
              NASA Explorer
            </h1>
          </div>
          <button onClick={fetchData} className='flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2'>
            <Search/>
            <span className='text-xl'>Discover</span>
          </button>
        </header>


        <main className='mt-8'>
          <div className='bg-gray-800 rounded-xl overflow-hidden max-w-3xl mx-auto'>
            <div className='aspect-video'>
            {image ? (
              <img 
                src={image.url}
                alt={image.title}
                className='w-full h-full object-cover'
              /> ) : (
                <div className='w-full h-full flex items-center justify-center bg-white'>
                  <p className='font-bold text-3xl'>Click Discover to Render Photo</p>
                </div>
              )
            }
            </div>
          </div>
          <div className='bg-gray-800 rounded-xl overflow-hidden max-w-3xl mx-auto mt-6'>
            <div className='p-3 flex items-center gap-3 border-b border-gray-800'>
              <HelpCircle className="w-6 h-6 text-blue-400"/>
              <h3 className='text-white text-xl font-medium'>Image Attributes</h3>
            </div>

            <div className='p-3 flex justify-between border-b border-gray-800'>
              <div className='flex gap-3'>
                <Type className='w-6 h-6 text-slate-400'/>
                <p className='text-slate-400'>Title</p>
              </div>
          
              {image ? (
                <p className='text-white font-medium text-base'>{image.title}</p>
              ) : (
                <p className='text-white'></p>
              )}
            </div>

            <div className='border-b border-gray-700'></div>

            <div className='p-3 flex justify-between border-b border-gray-800 mb-1'>
              <div className='flex gap-3'>
                <Calendar className='w-6 h-6 text-slate-400'/>
                <p className='text-slate-400'>Date</p>
              </div>
          
              {image ? (
                <p className='text-white font-medium text-base'>{image.date}</p>
              ) : (
                <p className='text-white'></p>
              )}
            </div>
          </div>

          <div className='bg-gray-800 rounded-xl overflow-hidden max-w-3xl mx-auto mt-6'>
            <div className='flex justify-between'>
              <div className='p-3 flex items-center gap-3 border-b border-gray-800'>
                <Info className='w-6 h-6 text-blue-400'/>
                <h3 className='text-white text-xl font-medium'>About This Image</h3>
              </div>
              <button onClick={handleToggle}>
                {isOpen ? (
                  <ChevronUp className='text-slate-400 pr-1' />
                ) : (
                  <ChevronDown className='text-slate-400 pr-1' />
                )}
              </button>
            </div>
            {isOpen && (
              <p className='text-slate-400 p-3'>{image.explanation}</p>
            )}
          </div>
          
        </main>
      </div>
    </div>
  )
}

export default App
