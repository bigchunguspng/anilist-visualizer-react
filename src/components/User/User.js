import useFetch from "../../useFetch";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import UserHeader from "./UserHeader";
import Animanga from "../Animanga/Animanga";

function User() {

    const {username} = useParams();
    const {data: user, isPending, error} = useFetch(`http://localhost:5000/api/user/${username}`);

    useEffect(() => {
        document.title = username + " · Anilist Visualizer";
    }, [username]);

    return (
        <React.Fragment>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {user && (
                <React.Fragment>
                    <UserHeader user={user}/>
                    <Animanga id={user.id}/>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default User;