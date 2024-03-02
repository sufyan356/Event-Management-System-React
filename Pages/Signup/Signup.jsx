import React, { useState } from "react";
import { Button, Form, Input, Col, Row } from "antd";
import "./Signup.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
  doc,
  auth,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  db,
  updateDoc,
} from "../../Firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";
const successMsg = () => {
  toast.success("Sign Up Successfully!", {
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

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const SignupCal = async (values, form) => {
    let userName = values.username;
    let userEmail = values.Email;
    let userPassword = values.password;
    try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
          );
          successMsg()
          const user = userCredential.user;
    
          const docRef = await addDoc(collection(db, "Users"), {
            userName,
            userEmail,
            userPassword,
          });
    
        
          const userID = doc(db, "Users", docRef.id);
    
          await updateDoc(userID, {
            userID: docRef.id,
          });
    
          localStorage.setItem(
            "latestUser",
            JSON.stringify({ id: docRef.id, name: userName })
          );
          form.resetFields();
       

    } catch (error) {
      errorMsg();
      console.log(error.code);
      console.log(error.message);
    }
  };

  const onFinish = (values) => {
    SignupCal(values, form);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ToastContainer />
      <Row>
        <h1 className="text-center w-100 signUpHead">Sign Up Here</h1>
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
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

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
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="signUpBtn"
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </div>
              <div className="text-center">
                Already Have An Account?{" "}
                <NavLink className="signUpLink" to="/Login">
                  <span>Login</span>
                </NavLink>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
