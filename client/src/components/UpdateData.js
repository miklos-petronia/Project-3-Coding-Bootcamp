import { useState } from 'react';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import { useMutation } from '@apollo/client';
import { MUTATION_UPDATE_NOTE } from '../utils/mutations';

const UpdateData = ({editData}) => {
    const [updateForm, setForm] = useState({
        id: editData._id,
        category: editData.category,  
        noteInput: editData.noteInput,
        link: editData.link,

    });

    const [updateNote, { error }] = useMutation(MUTATION_UPDATE_NOTE);

    const inputUpdate = (event) => {
        setForm({
            ...updateForm,
            [event.target.name]: event.target.value
        });
    };

    const submitData = async (event) => {
        event.preventDefault();

        try {
            await updateNote({
                variables: updateForm,
            });

           
            window.location.assign("/home")
        } catch (error) {
            throw error
        }
    };

    return (
        <div>
            <h4>Update Note Form</h4>
            <Form onSubmit={submitData}>
                <Form.Group className="mb-3" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={updateForm.category} onChange={inputUpdate} placeholder="Your First Name" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Note </Form.Label>
                    <Form.Control type="text" name="noteInput" value={updateForm.noteInput} onChange={inputUpdate} placeholder="Your Username" />
                </Form.Group>

                

                <Form.Group className="mb-3" >
                    <Form.Label>Link</Form.Label>
                    <Form.Control type="text" name="link" value={updateForm.link} onChange={inputUpdate} placeholder="question" />
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

export default UpdateData;