import { React } from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, Segment } from "semantic-ui-react";
import PostCard from "../components/PostCard";

function Home() {
  let posts = "";
  const { isLoading, data } = useQuery(FETCH_POSTS_QUERY);
  if (data) {
    posts = data.getPosts;
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {isLoading ? (
            <h1>Loading posts...</h1>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id}>
                <Segment basic>
                  <PostCard post={post} />
                </Segment>
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    );
  } else {
    return <p>load</p>;
  }
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default Home;
