import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    // formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <div className="flex items-center justify-center flex-grow">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6"
                >
                    <h1 className="font-bold text-2xl mb-6 text-center text-gray-800">Create Your Account</h1>
                    <div className="my-4">
                        <Label className="text-gray-800 font-medium">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Full Name"
                            className="mt-2 bg-white border border-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="my-4">
                        <Label className="text-gray-800 font-medium">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Email"
                            className="mt-2 bg-white border border-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="my-4">
                        <Label className="text-gray-800 font-medium">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Phone Number"
                            className="mt-2 bg-white border border-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="my-4">
                        <Label className="text-gray-800 font-medium">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Password"
                            className="mt-2 bg-white border border-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className="text-gray-700 font-medium">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className="text-gray-700 font-medium">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-4">
                            <Label className="text-gray-800 font-medium">Profile Photo</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer bg-white text-gray-800"
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4 bg-blue-700 text-white py-3">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white py-3 transition-transform transform hover:scale-105"
                        >
                            Signup
                        </Button>
                    )}
                    <p className="text-sm text-gray-600 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
