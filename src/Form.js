import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field, setNestedObjectValues } from "formik";
import * as Yup from "yup";

const UserForm = ({values, touched, errors, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className="user-form">
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                />
                {touched.name && errors.name && <p>{errors.name}</p>}

                <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}

                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                />
                {touched.password && errors.password && <p>{errors.password}</p>}

                <Field
                    type="checkbox"
                    name="termsOfService"
                    checked={values.termsOfService}
                />
                <span className="checkmark"/>

                <button type="submit">Submit</button>
            </Form>
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, termsOfService}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || ""
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("What is your name?"),
        email: Yup.string().required("What is your email?"),
        password: Yup.string().required("Please enter a password."),
        termsOfService: Yup.string().required("Terms of Service must be accepted to continue.")
    }),

    handleSubmit(values, { setStatus }) {
        axios.post("https://reqres.in/api/users/", values)
        .then(res => {
            setStatus(res.data);
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
})(UserForm);
console.log(FormikUserForm);

export default FormikUserForm;