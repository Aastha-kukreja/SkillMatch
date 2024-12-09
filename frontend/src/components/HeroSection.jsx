import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-r from-red-500 to-purple-600 text-center py-16'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-6 py-2 rounded-full bg-opacity-40 bg-white text-[#6A38C2] font-semibold text-lg'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-5xl font-extrabold text-white'>
                    Search, Apply & <br />
                    Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-lg text-white mt-4'>
                    Your skills hold the key, SkillMatch unlocks the door to your dream career!
                </p>
                <div className='flex w-[50%] max-w-lg mx-auto mt-8 shadow-2xl border-2 border-gray-200 rounded-full items-center gap-4 p-3'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-full py-2 px-4 rounded-full outline-none text-lg text-gray-800 focus:ring-2 focus:ring-[#6A38C2] transition duration-200'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5a2e97] transition-colors duration-200 text-white">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
