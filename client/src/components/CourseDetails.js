import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CourseDetails = ({ context, history, match }) => {

    const [course, setCourse] = useState([]);
    const id = Number(match.params.id); // The value is from the url. '/'
    const { data, authenticatedUser } = context;
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
    });
    const { firstName, lastName } = author; // Destructures author.

    useEffect(() => {
        data.getCourse(id)
            .then((course) => {
                if(course === 404) {
                    console.log(course);
                    history.push("/notfound");
                } else {
                    setCourse(course);
                    setAuthor({
                        firstName: course.user.firstName,
                        lastName: course.user.lastName
                    }) 
                }
            }).catch (error => {
                console.error(error);
                history.push("/error");                
            })
    }, [data, history, authenticatedUser, id]);
    
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                {
                    /**
                     * Compares the person who logged in and her user Id
                     * to the course's user Id to validate authentication
                     * and have access to the Update and Delete buttons.
                     */
                    authenticatedUser && authenticatedUser.user.id === course.userId
                    ?
                    <>
                        <Link to={`/courses/${course.id}/update`} className="button">
                            Update Course
                        </Link>
                        <Link to={`/courses/${course.id}/delete`} className="button">
                            Delete Course
                        </Link>   
                    </>
                    :
                    null
                }                    
                    <Link to="/" className="button button-secondary">
                        Return to List
                    </Link>
                </div>
            </div>
            <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>
                            By: {firstName} {lastName} 

                        </p>
                        <ReactMarkdown>{course.description}</ReactMarkdown>
                    </div>
                    <div>
                        <h3 className="course--detail--title">ESTIMATED TIME</h3>
                        <p>{course.estimatedTime}</p>
                        <h3 className="course--detail--title">MATERIALS NEEDED</h3>
                        <ReactMarkdown className="course--detail--list">
                            {course.materialsNeeded}
                        </ReactMarkdown>
                    </div>
                </div>
            </form>
            </div>
        </main>
    );
}

export default CourseDetails;