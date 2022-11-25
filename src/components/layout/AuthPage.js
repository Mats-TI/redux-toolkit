import {} from 'react-feather';
import { useState } from 'react';
import { Button, Checkbox, Form, Input} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import contentifyImg from '../../components/Media/writer-icon-removebg.png';

const AuthPage=()=>{
    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showLoginForm,setShowLoginForm]=useState(true);
    const [forgotPassword,setForgotPassword]=useState(false);

    const onFinish=(values)=>{
        console.log('form sucessfully submitted',values)
    }
    const onFinishFailed=(err)=>{
        console.log('Form did not submit...',err)
    }

    return(
        <section className='mt-5 row md-12' style={{backgroundColor:"#2B3743"}}>
            <div className='mt-3 col-6 order-2'>
                <h3 className='h3 text-center'>Welcome to Contentify</h3>
                {showLoginForm ? (<><p className='my-5 text-center'>Log in to your account to pick up where you left off...</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    layout='vertical'
                    wrapperCol={{
                        span:15,
                        offset:5
                    }}

                    autoComplete='on'
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Username!',
                        },
                    ]}
                    >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Password!',
                        },
                    ]}
                    >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                    </Form.Item>
                    <Form.Item  wrapperCol={{span:20}} className='text-right'>    
                    <a className="login-form-forgot" onClick={()=>{setForgotPassword(true)}}>
                        Forgot password?
                    </a>
                    </Form.Item>
                    <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button col-12">
                        Log in
                    </Button>
                    </Form.Item>
                </Form>
                <p className='my-5 text-center '>Don't have an account? <a  class='mask' onClick={()=>{setShowLoginForm(false)}}>Create a new one here!</a></p></>):(<><p className='my-5 text-center'>First time? Create a new account below...</p>
                <Form
                    name="registerForm"
                    layout='vertical'
                    wrapperCol={{
                    span: 15,
                    offset:5
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    labelCol={{
                        offset:10,
                        span:15,
                        }}
                        wrapperCol={{
                        span: 15,
                        offset:5
                        }}
                    label="E-mail"
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your E-mail!',
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
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
                    <Form.Item
                    label="Confirm Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please confirm your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    name="remember"
                    valuePropName="checked"
                    >
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{
                        offset: 5,
                        span: 15,
                    }}
                    >
                    <Button type="primary" htmlType="submit" className='col-12 text-center'>
                        Register
                    </Button>
                    </Form.Item>
                </Form>
                <p className='my-5 text-center '>Don't have an account? <a class='mask' onClick={()=>{setShowLoginForm(true)}}>Log In here! </a></p></>)}
            </div>
            <div className='col-md-6 col-sm-12 d-xs-none d-sm-none d-md-block'>
                <img src={contentifyImg} className='w-100 h-100 rounded' alt='Contentify'></img>
            </div>
        </section>
    )
}
export default AuthPage;