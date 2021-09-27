import { useMutation, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import { useForm } from "../utils/hooks";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, seterrors] = useState({});

  const { onChange, onSubmit, values } = useForm(onlogin, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result.data.login);
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
      seterrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function onlogin() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />{" "}
        <Button type="Submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
