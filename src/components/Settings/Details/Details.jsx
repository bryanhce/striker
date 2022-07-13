import { Button, notification, Modal } from "antd";
import { Fragment, useState } from "react";
import { auth } from "../../../firebase";
import { useUserAuth } from "../../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const { resetPassword, deleteUserAccount } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //I know this is not the best practice
  let email = "";
  let userId = "";
  try {
    email = auth.currentUser.email;
    userId = auth.currentUser.uid;
  } catch {
    email = "unable to retrieve email, please refresh";
    userId = "0";
  }

  const deleteTaskHandler = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://striker-backend.herokuapp.com/user/${userId}`,
      requestOptions
    )
      .then((response) => {
        console.log(response.json());
      })
      .catch((err) => {
        console.log("error when deleting " + err);
      });
  };

  const handleResetSubmit = async (e) => {
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

  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState(
    "Are you 100% sure you want to delete your account?"
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("Deleting account in progress...");
    deleteTaskHandler();
    deleteUserAccount(auth.currentUser)
      .then((res) => console.log(res))
      .catch((err) => console.log("error when deleting user " + err));
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            size="medium"
            onClick={handleResetSubmit}
          >
            Reset
          </Button>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>
          <strong>Delete Account:</strong>
        </h3>
        <span>
          Deleting yout account is irreversible. Proceed with caution.
        </span>
        <div
          style={{ display: "flex", flexDirection: "row", paddingTop: "1%" }}
        >
          <Button
            type="danger"
            htmlType="submit"
            shape="round"
            size="medium"
            onClick={showModal}
          >
            Delete
          </Button>
          <Modal
            title="Delete Account"
            style={{ fontWeight: "bold" }}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Delete"
            cancelText="Cancel"
            centered={true}
            okType="danger"
          >
            <p>{modalText}</p>
          </Modal>
        </div>
      </div>
      <br />
      <br />
      <hr />
    </Fragment>
  );
};

export default Details;
