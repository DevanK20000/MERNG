import { React, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Segment, Transition } from "semantic-ui-react";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import useWindowDimensions from "../utils/dimentions";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  // if (data) {
  const width = useWindowDimensions().width;
  return (
    <Grid columns={width > 977 ? 3 : width > 620 ? 2 : 1}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <Segment basic>
                    <PostCard post={post} />
                  </Segment>
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
  // } else {
  //   return <p>loading?</p>;
  // }
}

export default Home;
