import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Courses = ({ context, history }) => {
    /**
     * Initial value of the state variable.
     * courses holds the current state.
     * setCourses updates the courses state by passing it a new state
     * from data.getCourses()
     */
    const [courses, setCourses] = useState([]); // 
    const { data } = context;
    /**
     * First argument runs getCourses after initial rendering and 
     * after every rendering ONLY IF courses' state changes.
     */
    useEffect(() => {
        data.getCourses() // Future refactor: change to fetch() or axios.
            .then((courses) => {
                console.log(courses);
                setCourses(courses)
            })
            .catch((error) => {
                if (error) {
                  history.push("/error");
                }
              });
            // Future refactor: consider adding .finally()
    /** 
     * Optional second argument instructs React to render only 
     * if the value of dependencies data and history changes.
     * The new values then becomes available inside the hook. 
     */ 
    }, [data, history]); 

    return (
        <div className='wrap main--grid'>
            {courses.map((course) => {
                return (
                    <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}> {/** This key makes sure that the project doesn't get a unique key error message. */}
                    <div className="details">
                    <h3 className="course--title">{course.title}</h3>
                    <h5 className="course--title">{course.estimatedTime}</h5>
                    </div>
                    </Link>
                );
            })}
            <Link className="course--module course--add--module" to="/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                </span>
            </Link>
        </div>
    )
}

export default Courses;