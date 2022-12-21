import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Button, Form } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
    imageUrl: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div style={{ margin: "0 auto" }}>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Here is my story!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input type="file" name="imageUrl" onChange={onChange} />
        </Form.Field>
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0]?.message}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $imageUrl: String!) {
    createPost(body: $body, imageUrl: $imageUrl) {
      id
      body
      imageUrl
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
