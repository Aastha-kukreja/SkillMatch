import React, { useEffect, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: [
            "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata", "Jaipur"
        ],
    },
    {
        filterType: "Job Role",
        array: [
            "Frontend Developer", "Backend Developer", "FullStack Developer", "Data Analyst", "Graphic Designer", "UI/UX Designer", "Product Manager"
        ],
    },
    {
        filterType: "Salary",
        array: [
            "0-40k", "42k-1lakh", "1lakh-3lakh", "3lakh-5lakh", "5lakh-10lakh", "10lakh+"
        ],
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: [],
        "Job Role": [],
        Salary: [],
    });
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[filterType].includes(value)) {
                updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
            } else {
                updatedFilters[filterType] = [...updatedFilters[filterType], value];
            }
            return updatedFilters;
        });
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedFilters));
    }, [selectedFilters, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index} className='mb-4'>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    {data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        return (
                            <div key={itemId} className='flex items-center space-x-2 my-2'>
                                <Checkbox.Root
                                    id={itemId}
                                    checked={selectedFilters[data.filterType].includes(item)}
                                    onCheckedChange={(checked) => changeHandler(data.filterType, item)}
                                    className='w-5 h-5 border border-gray-300 rounded flex items-center justify-center'
                                >
                                    <Checkbox.Indicator className='text-blue-600'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='w-4 h-4'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M5 13l4 4L19 7'
                                            />
                                        </svg>
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                <Label htmlFor={itemId}>{item}</Label>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
