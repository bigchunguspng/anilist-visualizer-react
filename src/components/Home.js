import useFetch from "../useFetch";

function Home() {

    const {data: user, isPending, error} = useFetch('https://localhost:4975/api/user/5738343');

    return (
        <div className='home'>
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

export default Home;