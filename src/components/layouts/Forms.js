import React from 'react';
import { Col, Row } from "react-bootstrap";
import { CustomForm } from "./CustomInputs";

export const Email = ({ label = "Email", onChange, email, placeholder = "Enter your email" }) => (
    <CustomForm label={label} type="email" placeholder={placeholder} name="email" onChange={onChange} value={email} />
)

export const Name = ({ onChange, name, placeholder = "Enter your name", label = "Fullname" }) => (
    <CustomForm label={label} type="text" placeholder={placeholder} minLength="3" name="name" onChange={onChange} value={name} />
)

export const Password = ({ id = "password", onChange, password, label = "Password", placeholder = "Enter your password", name = "password" }) => (
    <CustomForm id={id} label={label} type="password" placeholder={placeholder} name={name} onChange={onChange} value={password} minLength="6" />
)

export const ConfirmPassword = ({ id = "confirm_password", onChange, password, label = "Confirm Password", placeholder = "Re-enter your password", name = "password_confirmation" }) => (
    <CustomForm id={id} label={label} type="password" placeholder={placeholder} name={name} onChange={onChange} value={password} minLength="6" equalTo="#password" />
)

export const FormLayout = ({ children }) => (
    <Row>
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
            {children}
        </Col>
    </Row>
)