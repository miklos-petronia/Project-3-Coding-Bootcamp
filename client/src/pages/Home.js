import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ONE_USER } from "../utils/queries"
import { useSiteContext } from "../utils/Context"
import { useState } from "react"

import { MUTATION_DELETE_NOTE } from "../utils/mutations"
import { MUTATION_SHARE_USER_NOTE, MUTATION_NOT_SHARE_NOTE } from '../utils/mutations'

import UpdateData from "../components/UpdateData"
import PostData from "../components/PostData"
import Shared from '../components/Shared';

import Table from 'react-bootstrap/Table';

const Home = () => {

    const { userToken } = useSiteContext()
    const tokenData = userToken()

    const { loading: loadingUserOneData, data: userOneData } = useQuery(QUERY_ONE_USER, {
        variables: { userName: tokenData.data.userName }
    });

    const [editForm, setEditForm] = useState("")
    const [editData, setEditData] = useState({})

    const displayEditForm = (data) => {
        setEditData({ ...data })
        setEditForm("displayEditForm")
    }

    const closeEditForm = () => {
        setEditForm("")
    }

    const [RemoveData, { error }] = useMutation(MUTATION_DELETE_NOTE)
    const submitDelete = async (item) => {
        try {
            await RemoveData({
                variables: { id: item._id }
            })
            window.location.assign("/home")
        } catch (error) {
            throw error
        }

    }

    const [shareNote, { error: errorNoteShare }] = useMutation(MUTATION_SHARE_USER_NOTE);
    const [notShareNote, { error: errorNoteNotShare }] = useMutation(MUTATION_NOT_SHARE_NOTE);

    const shareSubmit = async (item) => {
        try {
            const { data } = await shareNote({
                variables: { id: item._id },
            })
            window.location.assign('/home')
        } catch (error) {
            throw error
        }
    }

    const notShareSubmit = async (item) => {
        try {
            const { data } = await notShareNote({
                variables: { id: item._id },
            })
            window.location.assign('/home')
        } catch (error) {
            throw error
        }
    }

    const [postForm, displayPostForm] = useState('');

    const postFormButton = () => {
        postForm === true ? displayPostForm(false) : displayPostForm(true);
    }

    return (
        <>
            {loadingUserOneData ? (<div>getting notes..</div>) : (
                <>
                    <div style={{ paddingLeft: "75px", paddingRight: "75px", paddingTop: "50px" }}>
                        <h2>Hi {userOneData.userOne.firstName}!</h2>
                        <h5 className="pt-2" style={{ fontFamily: 'cursive' }}>Total Saved Notes: {userOneData.userOne.notesTotal}</h5>
                        <Table className="bg-body">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Notes | Code</th>
                                    <th>Link</th>
                                    <th>Date</th>
                                    <th>Shared</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOneData.userOne.notes.map((item, i) => (
                                    <tr key={item._id}>
                                        <td>{i + 1}</td>
                                        <td>{item.category}</td>
                                        <td>{item.noteInput}</td>
                                        <td><a href={item.link} target="_blank">Link</a></td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.shared === true ? "Shared" : "Not Shared"}</td>
                                        <td>
                                            <div>
                                                <button className="bg-success text-white mx-1" type="button" onClick={(event) => displayEditForm(item)}>edit</button>
                                                <button className="bg-danger text-white mx-1" type="button" onClick={(event) => submitDelete(item)}>delete</button>
                                                {item.shared === false ? (<button className="mx-1" type="button" onClick={(event) => shareSubmit(item)}>share</button>) :
                                                    (<button className="mx-1" type="button" onClick={(event) => notShareSubmit(item)}>not share</button>)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <div>
                            {editForm === "displayEditForm" ? (<button className="bg-secondary text-white" type="button" onClick={closeEditForm}>Close Form</button>) :
                                (
                                    <>
                                        {!postForm && <button className="bg-secondary text-white" type="button" onClick={postFormButton}>Add a New Note</button>}
                                        {postForm && <button className="bg-secondary text-white" type="button" onClick={postFormButton}>Close Form</button>}
                                    </>
                                )}
                        </div>

                        <div style={{ paddingTop: "25px" }}>
                            {postForm && <PostData />}
                        </div>

                        {editForm === "displayEditForm" && <UpdateData editData={editData} />}
                    </div>
                </>
            )}

            <Shared />
        </>
    );
};

export default Home;