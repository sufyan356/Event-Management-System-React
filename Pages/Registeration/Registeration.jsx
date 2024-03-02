import React from 'react'
import { useParams } from 'react-router-dom'
import { useState , useEffect } from 'react';
import { Button, Form, Input, Col, Row ,  Select} from "antd";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

import {
  collection,db,onSnapshot,doc,
  auth,addDoc,createUserWithEmailAndPassword,
  updateDoc,getDoc
} from "../../Firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";

const successMsg = () => {
  toast.success("You Regestered Successfully!", {
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

function Registeration() {
  const navigate = useNavigate()
  const [currId , setCurrId] = useState(null)
  const [currUserId , setUserId] = useState(null)
  const [form] = Form.useForm();
  const SignupCal = async (values, form , currEvent) => {
   
    console.log("currEvent" , currEvent)
    let userName = values.username;
    let userEmail = values.Email;
    let userPassword = values.password;
  
    console.log("form submited Successfully!..");

      try{
        const docRef = await addDoc(collection(db, "Registeration"), {
          userName,
          userEmail,
          userPassword,
          eventId:currEvent,
          userId:[currUserId]
        });
        successMsg();

        //UPDATE REGISTERATION DOCUMENT
        const userID = doc(db, "Registeration", docRef.id);
        await updateDoc(userID, {
          docId: docRef.id,
        });
        
        //UPDATE EVENTS DOCUMENT
        const eventId = doc(db, "Events", currEvent);
        const docSnapshot = await getDoc(eventId);
        const existingUserIdArray = docSnapshot.data().userId || [];
        const updatedUserIdArray = [...existingUserIdArray, currUserId];

        await updateDoc(eventId, {
          userId: updatedUserIdArray,
        });

        setTimeout(async () => {
          form.resetFields();
          navigate("/")
        });
      }
      catch(error){
        errorMsg()
        console.log(error.message)
        console.log(error.code)
      }
  };
    
   

  
  const {id} = useParams();
  const [eventsData, setEventsData] = useState([]);

  // FETCH EVENTS DATA
  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("latestUser"));
    setUserId(isUser.id)
    try{
      const unsubscribe = onSnapshot(collection(db, "Events"), (snapshot) => {
        const EventsData = [];
        snapshot.forEach((doc) => {
          EventsData.push(doc.data());
        });

        setEventsData(EventsData);
        console.log("id: " , id);
        setCurrId(id);
        return () => {
          // Cleanup the listeners when the component unmounts
          unsubscribe();
        };

      });
    }
    catch(error){
      console.log(error.code)
      console.log(error.message)
    }
  },[id]);

 
  const onFinish = (values) => {
    if (currId) {
      // Make sure currId is defined before calling SignupCal
      SignupCal(values, form, currId);
    } else {
      console.log("currId is not defined");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
 

 

  return (

    <>
    <ToastContainer />
    <Row>
      <h1 className="text-center w-100 signUpHead">Registeration Here</h1>
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
                  Register
                </Button>
              </Form.Item>
            </div>
            
          </Form>
        </div>
      </Col>
    </Row>
  </>
  )
}

export default Registeration