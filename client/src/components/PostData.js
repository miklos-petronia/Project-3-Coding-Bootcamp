import { useState } from 'react';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import { useMutation } from '@apollo/client';
import { MUTATION_POST_NOTE } from '../utils/mutations';
import { useSiteContext } from "../utils/Context"

const PostData = () => {
    const { userToken } = useSiteContext()
    const tokenData = userToken()
    const [postForm, setForm] = useState({
        category: "",
        noteInput: "",
        userName: tokenData.data.userName,
        link: "",
        shared: false,
    });

    const [postNote, { error }] = useMutation(MUTATION_POST_NOTE);

    const inputPost = (event) => {
        setForm({
            ...postForm,
            [event.target.name]: event.target.value
        });
    };

    const submitData = async (event) => {
        event.preventDefault();

        try {
            await postNote({
                variables: postForm,
            });


            window.location.assign("/home")
        } catch (error) {
            throw error
        }
    };

    return (
        <div>
            <h4>Add Note Form</h4>
            <Form onSubmit={submitData}>
                <Form.Group className="mb-3" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={postForm.category} onChange={inputPost} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Note </Form.Label>
                    <Form.Control type="text" name="noteInput" value={postForm.noteInput} onChange={inputPost} />
                </Form.Group>



                <Form.Group className="mb-3" >
                    <Form.Label>Link</Form.Label>
                    <Form.Control placeHolder="http://<mylink>.com" type="text" name="link" value={postForm.link}
                        onChange=
                        {inputPost} />
                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {error && (
                <p>{error.message}</p>
            )}
        </div>
    );
};

export default PostData;