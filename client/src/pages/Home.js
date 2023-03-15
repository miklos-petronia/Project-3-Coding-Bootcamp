import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS, QUERY_ONE_USER } from "../utils/queries"
import { useSiteContext } from "../utils/Context"
import {useState} from "react"
import { MUTATION_DELETE_NOTE } from "../utils/mutations"
import UpdateData from "../components/UpdateData"
import PostData from "../components/PostData"
const Home = () => {

    const { userToken } = useSiteContext()
    const tokenData = userToken()
    // const { loading, data: usersData } = useQuery(QUERY_ALL_USERS);
    const { loading: loadingUserOneData, data: userOneData } = useQuery(QUERY_ONE_USER, {
        variables: { userName: tokenData.data.userName }
    });
    console.log(tokenData.data.userName)

const [editForm, setEditForm] = useState("")
    const [editData, setEditData] = useState({})

    const displayEditForm = (data) => {
        setEditData({...data})
        setEditForm("displayEditForm")
    }

    const closeEditForm = () => { 
        setEditForm("")
    }

    const [RemoveData, { error }] = useMutation(MUTATION_DELETE_NOTE)
    const submitDelete = async (item) => {
        try { 
            await RemoveData({
                variables: {id: item._id}
            })
            window.location.assign("/home")
        } catch (error) {
            throw error
        } 
    
    }




    return (
        <>
            {loadingUserOneData ? (<div>loading...</div>) : (
                <>
                    <div>
                        <h1>{userOneData.userOne.userName}</h1>
                        <h1>{userOneData.userOne.firstName}</h1>
                        <div>

                            {userOneData.userOne.notes.map((item) => (
                                <div key={item._id}>
                                    <p>{item.category}</p>
                                    <p>{item.noteInput}</p>
                                    <p>{item.link}</p>
                                    <p>{item.createdAt}</p>
                                    <button type="button" onClick={(event) => displayEditForm(item)}>edit</button>

                                    <button type="button" onClick={closeEditForm}>close</button>
                                    <button type="button" onClick={(event) => submitDelete(item)}>delete</button>
                                </div>
                            ))}
                        </div>
                        {editForm === "displayEditForm" && <UpdateData editData={editData}/>}
                    </div>
                </>
            )}
            <PostData />
            {/* {loading ? (<div>loading...</div>) : (
            <>
            {usersData.usersAll.map((item) => (
                <div key={item._id}>
                    <p>{item.firstName}</p>
                    <p>{item.userName}</p>
                    <p>{item.userEmail}</p>

                </div>
            ))}
            </>
        )} */}
        </>
    );
};

export default Home;
