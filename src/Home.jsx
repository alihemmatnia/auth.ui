import React, { useState, useEffect } from "react";
import ax from "./axios.config";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginRight: 30,
    maxWidth: 350,
  },
  media: {
    height: 140,
  },
});

const Home = () => {
  const [post, setpost] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const { addToast } = useToasts();
  const logout = () => {
    localStorage.removeItem("token");
    history.replace({
      pathname: "/login",
    });
  };
  const Delete = (id) => {
    ax.delete(`Posts?Id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((e) => {
      addToast("با موفقیت حذف شد", { appearance: "success" });

      getAll();
    });
  };
  const getAll = () => {
    ax.get("Posts/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((e) => {
      setpost(e.data);
      console.log(e.data);
    });
  };
  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          بلاگ
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse show" id="navbarColor02">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                خانه <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                style={{ cursor: "default" }}
                onClick={() => {
                  history.push({
                    pathname: "/add",
                  });
                }}
              >
                ثبت پست
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                style={{ cursor: "default" }}
                onClick={() => logout()}
              >
                خروج
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container d-flex justify-content-center align-items-center">
        {post.map((e) => {
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`https://localhost:5001/Images/${e.image}`}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {e.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {e.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => Delete(e.id)}
                  color="danger"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
};
export default Home;
