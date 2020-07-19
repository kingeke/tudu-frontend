import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { apiLinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { userProfile } from '../../../store/actions/profileActions'
import { CustomButton } from '../../layouts/CustomInputs'
import { Email, FormLayout, Name } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
require('parsleyjs')

export class EditProfile extends Component {

    formRef = React.createRef()

    initialState = {
        name: this.props.user.name,
        email: this.props.user.email,
        formSending: false
    }

    state = this.initialState

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (this.formRef.current) {
                    $(this.formRef.current).parsley().reset();
                };
                this.props.userProfile()
            })
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
                this.props.update(this.state)
            })
        }
    }

    render() {
        return (
            <MainLayout pageTitle="Edit Profile">
                <FormLayout>
                    <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                        <Name name={this.state.name} onChange={this.handleChange} />
                        <Email email={this.state.email} onChange={this.handleChange} />
                        <CustomButton type="submit" variant="success" icon="upload" title="Update" loading={this.state.formSending} onClick={this.handleSubmit} />
                    </Form>
                </FormLayout>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (data) => dispatch(formAction('put', apiLinks.updateProfile, data)),
        userProfile: () => dispatch(userProfile())
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
        user: users.auth.user
    }
}

EditProfile.propTypes = {
    user: PropTypes.object,
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    update: PropTypes.func,
    userProfile: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)