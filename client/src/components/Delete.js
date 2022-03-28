import React, { useEffect, useState } from "react";

const DeleteCourse = ({context, history, match}) => {
    const { password, user } = context.authenticatedUser;
    const courseId = Number(match.params.id.slice(1));
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState({validationErrors: []});

    useEffect(() => {
        context.data
        .getCourse(courseId)
        .then((course) => {
          if (course) {
            setCourse(course);

            if (user.id !== course.userId) {
                history.push("/forbidden");
            }
          } else {
            history.push("/notfound");
          }
        })
        .catch((error) => {
          if (error) {
            history.push("/error");
          }
        });
      }, [context.data, user.id, history, course.userId, courseId]);

      const handleDelete = (e) => {

            context.data.deleteCourse(courseId, user.emailAddress, password)
            .then((errors) => {
              if (errors.length) {
                setErrors({
                  validationErrors: errors,
                });
              } else {
                history.push("/");
              }
            })
    }

    return (
        <div className="wrap">
            <h2>Are you sure you want to delete this Course?</h2>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <form onSubmit={handleDelete}>
                <button className="button" type='submit'>Delete Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default DeleteCourse;