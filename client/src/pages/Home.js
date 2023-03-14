import { useQuery } from "@apollo/client";
import {QUERY_ALL_USERS} from "../utils/queries"

const Home = () => {
    const { loading, data: usersData } = useQuery(QUERY_ALL_USERS);

    return (
        <>
        {loading ? (<div>loading...</div>) : (
            <>
            {usersData.usersAll.map((item) => (
                <div key={item._id}>
                    <p>{item.firstName}</p>
                    <p>{item.userName}</p>
                    <p>{item.userEmail}</p>

                </div>
            ))}
            </>
        )}
        </>
    );
};

export default Home;
