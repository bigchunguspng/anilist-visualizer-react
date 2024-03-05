import useFetch from "../useFetch";
import { useParams } from 'react-router';

function User(props) {

    const { id } = useParams();
    const {data: user, isPending, error} = useFetch(`http://localhost:5000/api/user/by-name/${id}`);

    return (
        <div className='user-holder'>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {user && (<div className='user'>
                <a href={user.url} target='_blank' rel="noreferrer">
                    <img src={user.avatar.largeImageUrl} alt='[user avatar]'/>
                </a>
                <h2>{user.name}</h2>
            </div>)}
        </div>
    );
}

export default User;