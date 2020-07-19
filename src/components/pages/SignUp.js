import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { routeLinks } from '../../routes/NavLinks'
import { UserAuth } from '../../services/AuthService'
import { registerAction } from '../../store/actions/authActions'
import { CustomButton } from '../layouts/CustomInputs'
import { Hr } from '../layouts/CustomLayouts'
import { Email, FormLayout, Name, Password, ConfirmPassword } from '../layouts/Forms'
import MainLayout from '../layouts/MainLayout'
import { showNotification } from '../includes/Notifications'
require('parsleyjs')

export class SignUp extends Component {

    formRef = React.createRef()

    initialState = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        formSending: false
    }

    state = this.initialState

    componentDidMount = () => {
        if (UserAuth.isAuthenticated) {
            this.props.history.push(routeLinks.index)
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            })
        }

        if (nextProps.user) {
            showNotification('Registered successfully, welcome to your todo app.', 'success')
            nextProps.history.push(routeLinks.index)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        var form = $(this.formRef.current).parsley()

        if (e.isTest || form.isValid()) {
            e.preventDefault()
            this.setState({
                formSending: true
            }, () => {
                this.props.register(this.state)
            })
        }
    }

    render() {
        return (
            <MainLayout>
                <section className="container">
                    <div className="text-center">
                        <h4>Welcome{this.state.name ? ` ${this.state.name}` : ''}, we're glad you're joining us.</h4>
                        <Hr />
                        <p>We just need some details and we'll get you right to your dashboard.</p>
                    </div>
                    <FormLayout>
                        <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                            <Name name={this.state.name} onChange={this.handleChange} />
                            <Email email={this.state.email} onChange={this.handleChange} />
                            <Password password={this.state.password} onChange={this.handleChange} />
                            <ConfirmPassword password={this.state.password_confirmation} onChange={this.handleChange} />
                            <CustomButton type="submit" variant="success" icon="check" title="Sign Up" loading={this.state.formSending} onClick={this.handleSubmit} />
                        </Form>
                    </FormLayout>
                </section>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (data) => dispatch(registerAction(data))
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
        user: users.auth.user
    }
}

SignUp.propTypes = {
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    register: PropTypes.func,
    user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)