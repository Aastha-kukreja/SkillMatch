import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        let filteredJobs = allJobs;

        if (searchedQuery) {
            // Apply the filter logic based on selected filters
            const { Location, "Job Role": jobRoles, Salary } = searchedQuery;

            filteredJobs = filteredJobs.filter((job) => {
                const locationMatch = Location.length === 0 || Location.includes(job.location);
                const roleMatch = jobRoles.length === 0 || jobRoles.includes(job.role);
                const salaryMatch = Salary.length === 0 || Salary.some((range) => job.salaryRange.includes(range));

                return locationMatch && roleMatch && salaryMatch;
            });
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-1/6'>
                        <FilterCard />
                    </div>
                    {filterJobs.length <= 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
