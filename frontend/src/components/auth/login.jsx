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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto py-10 px-4 bg-gray-50">
                <form
                    onSubmit={submitHandler}
                    className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border border-gray-300 rounded-lg shadow-md bg-white p-6"
                >
                    <h1 className="font-bold text-2xl mb-6 text-gray-800 text-center">Login</h1>
                    <div className="my-4">
                        <Label className="text-gray-700">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="mt-2"
                        />
                    </div>

                    <div className="my-4">
                        <Label className="text-gray-700">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col my-6">
                        <span className="text-gray-700 mb-3 font-medium">Select Role</span>
                        <RadioGroup className="flex justify-around gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1" className="text-gray-600">
                                    Student
                                </Label>
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
                                <Label htmlFor="r2" className="text-gray-600">
                                    Recruiter
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Login
                        </Button>
                    )}
                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
