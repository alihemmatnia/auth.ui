import React, { useState } from "react";
import Swal from "sweetalert2";
import ax from "../axios.config";
import { useHistory } from "react-router";
import { ToastProvider, useToasts } from "react-toast-notifications";

const AddPost = () => {
  const [file, selectfile] = useState(null);
  const [title, settitle] = useState(null);
  const [content, setcontent] = useState(null);
  const { addToast } = useToasts();

  const fileChange = (e) => {
    console.log(e.target.files);
    selectfile(e.target.files[0]);
  };
  const history = useHistory();

  const onSendPost = () => {
    if (title == null || content == null) {
      addToast("عنوان و توضیحات را وارد کنید", { appearance: "error" });
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file != null) {
        formData.append("imgup", file);
      }
      console.log(formData);
      ax.post("posts/", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((e) => {
        if (e.data.success) {
          addToast("با موفقیت پست جدید افزوده شد", { appearance: "success" });

          history.replace({
            pathname: "/",
          });
        }
      });
    }
  };
  return (
    <>
      <div class="wrap  justify-content-center">
        <h3 class="text-center">ایجاد پست</h3>
        <div>
          <label for="fname" class="text-right">
            عنوان
          </label>
          <input
            id="fname"
            onChange={(e) => settitle(e.target.value)}
            type="text"
            class="cool form-control"
          />
        </div>

        <div>
          <label for="lname">توضیحات</label>
          <textarea
            id="lname"
            onChange={(e) => setcontent(e.target.value)}
            type="text"
            class="cool form-control"
          ></textarea>
        </div>

        <div>
          <label for="email">تصویر</label>
          <input
            onChange={(e) => fileChange(e)}
            id="email"
            type="file"
            class="cool form-control"
          />
        </div>
        <br />

        <button
          onClick={() => onSendPost()}
          class=" text-center btn btn-primary"
        >
          ایجاد
        </button>
      </div>
    </>
  );
};

export default AddPost;
