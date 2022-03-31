import React, { useEffect, useState, useRef } from "react";

const UpdateCourse = ({ context, history, match }) => {
    // https://reactjs.org/docs/hooks-reference.html#useref
    const courseTitle = useRef();
    const courseDescription = useRef();
    const courseEstimatedTime = useRef();
    const courseMaterialsNeeded = useRef();
    const [errors, setErrors] = useState({validationErrors: []});
    const { password, user } = context.authenticatedUser; // Destructures to get the user's password.
    const courseId = Number(match.params.id); // Course Id.
    /**
     * Calls getCourse() when this component loads,
     * and retrieves a course using matched id from the url.
     * Loads the course information. Reroutes the user if the course is not found.
     * useEffect() only runs once because I didn't define its dependencies.
     */
    useEffect(() => {
        context.data
            .getCourse(courseId)
            .then((course) => {
                if (course === 404) {   
                    history.push("/notfound");
                } else {
                    if (user.id !== course.userId) {
                        history.push("/forbidden");
                    } else {
                        courseTitle.current.value = course.title;
                        courseDescription.current.value = course.description;
                        courseEstimatedTime.current.value = course.estimatedTime;
                        courseMaterialsNeeded.current.value = course.materialsNeeded;                           
                    }
                }
            })
            .catch((error) => {
                if (error) { history.push("/error"); }
            });
    }, [context.data, courseId, history, user.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Define the courseDetail with the retrieved values.
        const courseDetail = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: courseEstimatedTime.current.value,
            materialsNeeded: courseMaterialsNeeded.current.value,
            userId: user.id
        };
        // Use the matched Id, course detail, and user authentication info to update a course.
        context.data.updateCourse(
            courseId,
            courseDetail,
            user.emailAddress, password)
        .then((errors) => {
            if (errors.length) {
                setErrors({
                    validationErrors: errors,
                });
            } else {
                history.push(`/courses/${courseId}`)
            }
          })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            {
                errors.validationErrors.length > 0
                ?
                <div className="validation--errors">
                    <h3>Validation Error</h3>
                    <ul>
                        {errors.validationErrors.map((error, i) => {
                            return <li key={i}>{error}</li>
                        })}
                    </ul>
                </div>
                :
                null
            }
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="title">Course Title</label>
                        <input type="text" id='title' name='title' ref={courseTitle} />
                        <label htmlFor="description">Course Description</label>
                        <textarea id='description' name='description' ref={courseDescription} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id="estimatedTime" name='estimatedTime' ref={courseEstimatedTime} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name='materialsNeeded' ref={courseMaterialsNeeded} />
                    </div>
                </div>
                <button className="button" type='submit'>Update Course</button>
                <a href={`/courses/${courseId}`} className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default UpdateCourse;