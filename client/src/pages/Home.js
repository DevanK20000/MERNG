import { React } from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, Segment } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import useWindowDimensions from "../utils/dimentions";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  // if (data) {
  return (
    <Grid columns={useWindowDimensions().width > 1555 ? 3 : 1}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
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
  // } else {
  //   return <p>loading?</p>;
  // }
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
