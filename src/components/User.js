import useFetch from "../useFetch";

function User(props) {

    const {data: user, isPending, error} = useFetch(`http://localhost:5000/api/user/${props.id}`);

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