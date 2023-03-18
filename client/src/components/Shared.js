import { useQuery } from '@apollo/client';
import { QUERY_SHARED_NOTES_ALL } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Shared() {

    const { loading: sharedNotesLoading, data: sharedNotesData } = useQuery(QUERY_SHARED_NOTES_ALL);

    return (
        <>
            {sharedNotesLoading ? (<>getting shared notes...</>) : (
                <>
                    <div style={{ paddingLeft: "200px", paddingRight: "200px" }}>
                        <div className="fs-2" style={{ textAlign: "center", fontFamily: "cursive" }}>Shared Notes</div>
                        <div>
                            {sharedNotesData.sharedAll.map((note) => (
                                <div key={note._id}>
                                    <br></br>
                                    <Card >
                                        <Card.Header className="fs-5 text fw-bold text-success">{note.sharedCategory}</Card.Header>
                                        {note.sharedNotes.map((s) => (
                                            <ListGroup key={s._id} variant="flush" className="border border-success">
                                                <ListGroup.Item className="d-flex justify-content-between">
                                                    <span>{s.noteInput}</span>
                                                    <div className='d-flex gap-3'>
                                                        <span>by: {s.userName}</span>
                                                        <a href={!s.link ? {} : s.link} target="_blank">Link</a>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        ))}
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Shared