import { Button, notification } from "antd";
import { Fragment, useState } from "react";
import { auth } from "../../../firebase";
import { useUserAuth } from "../../../context/UserAuthContext";

const Details = () => {
  const { resetPassword } = useUserAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      successNotification();
    } catch (err) {
      setError(err.message);
      console.log(error);
      errorNotification();
    }
  };

  const errorNotification = () => {
    notification["error"]({
      message: "Password Reset Failed",
      description: "Please refresh and try again.",
    });
  };

  const successNotification = () => {
    notification["success"]({
      message: "Password Reset Successful",
      description:
        "Please follow the instructions sent to your email to reset your password! It might have been sent to your junk!",
    });
  };

  let email = "";
  console.log(auth);
  //I know this is not the best practice
  try {
    email = auth.currentUser.email;
  } catch {
    email = "unable to retrieve email, please refresh";
  }

  return (
    <Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>
          <strong>Email:</strong>
        </h3>
        <span>{email}</span>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>
          <strong>Reset Password:</strong>
        </h3>
        <span style={{ paddingBottom: "1%" }}>Click to reset!</span>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        shape="round"
        size="medium"
        style={{ marginRight: "5%" }}
        onClick={handleSubmit}
      >
        Reset
      </Button>
      <br />
      <br />
      <hr />
    </Fragment>
  );
};

export default Details;
