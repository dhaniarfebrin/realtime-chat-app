import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const toastOptions = {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = values;

        const { data } = await axios.post(loginRoute, {
            email,
            password,
        });

        // validation from response server
        if (data.status === false) {
            toast.error(data.message, toastOptions);
        }

        if (data.status === true) {
            localStorage.setItem("user", JSON.stringify(data.data));
            navigate("/");
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h1>snappy</h1>
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <button type="submit">Get In</button>
                    <span>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        width: 25vw;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: capitalize;
            margin-top: 1rem;
            text-align: center;
            a {
                color: #997af0;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;
