import "./Login.css";
import React from "react";
import { Button, Form, Input, Col, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import {
  initializeApp,
  app,
  auth,
  collection,
  addDoc,
  db,
  signInWithEmailAndPassword,
  getDocs,
} from "../../Firebase/Firebase";
const successMsg = () => {
  toast.success("Login Successfully!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const errorMsg = () => {
  toast.error("something went wrong!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const Login = () => {

  const [form] = Form.useForm();
  const [adminPass, setAdminPass] = useState("cPLmX1bV1dG20T6fxF74");
  const navigate = useNavigate();

  const loginFunctionality = async (values, adminPass) => {
    let userEmail = values.Email;
    let userPassword = values.password;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      successMsg()

      const PostsQuerySnapshot = await getDocs(collection(db, "Users"));
      

      PostsQuerySnapshot.forEach((val) => {
        if (val.data().userEmail === userEmail) {
          console.log("LatestUserID ->", val.data().userID);
          localStorage.setItem(
            "latestUser",
            JSON.stringify({ id: val.data().userID, name: val.data().userName })
          );

          // if (val.data().password === adminPass) {
          //   console.log("admin loged in");
          //   // setTimeout(() => navigate("/dashboard"),2000)
          //   navigate("/dashboard")
          // } 
          // else if(val.data().password !== adminPass) {
          //   navigate("/");
          //   console.log("user loged in after redirection");
          // }
        }
      });

      const user = userCredential.user;
    } 

    catch (error) {
      errorMsg();
      console.log(error.code);
      console.log(error.message);
    }

  };

  const onFinish = (values) => {
    loginFunctionality(values, adminPass)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ToastContainer/>

      <Row>
        <h1 className="w-100 text-center loginHead">Login Here</h1>
        <Col span={24} className="colomn">
          <div className="formContainer">
            <Form
              form={form}
              className="FormClass"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div>
                <Form.Item
                  className="margin-0"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit" className="loginBtn">
                    Login
                  </Button>
                </Form.Item>
              </div>

              <div className="text-center">
                Create another Account?{" "}
                <NavLink className="signUpLink" to="/Signup">
                  <span>Sign Up</span>
                </NavLink>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
