import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUsersRoute } from "../utils/APIRoutes";

export default function Chat() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        async function validation() {
            if (!localStorage.getItem("user")) {
                return navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("user")));
            }
        }

        async function fetchData() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const { data } = await axios.get(
                        `${getAllUsersRoute}/${currentUser._id}`
                    );
                    setContacts(data);
                } else {
                    navigate("/setavatar");
                }
            }
        }
        validation();
        fetchData();
    }, [currentUser]);

    return (
        <Container>
            <div className="container"></div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;
