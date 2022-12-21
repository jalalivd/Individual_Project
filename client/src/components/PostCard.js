import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import MyPopup from "../util/MyPopup";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    imageUrl,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://semantic-ui.com/images/avatar2/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          <div
            style={{
              display: "grid",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "250px",
                overflow: "hidden",
              }}
            >
              <img
                src={imageUrl}
                alt="this is for post"
                style={{
                  marginBottom: "8px",
                  width: "100%",
                  aspectRatio: "auto",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
              />
            </div>
            <div>{body}</div>
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
