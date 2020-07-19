import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { apiLinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { CustomButton } from '../../layouts/CustomInputs'
import { FormLayout, Name } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
require('parsleyjs')

export class CreateTodo extends Component {

    formRef = React.createRef()

    initialState = {
        name: '',
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
                if (nextProps.formSuccess) {
                    this.setState(this.initialState)
                }
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
                this.props.create(this.state)
            })
        }
    }

    render() {
        return (
            <MainLayout pageTitle="Create a Todo-Item">
                <FormLayout>
                    <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit} autoComplete={'off'}>

                        <Name onChange={this.handleChange} name={this.state.name} label="Enter name" placeholder="Enter name" />

                        <CustomButton type="submit" icon='check' loading={this.state.formSending} title='Create' variant='success' onClick={this.handleSubmit} />

                    </Form>
                </FormLayout>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: (data) => dispatch(formAction('post', apiLinks.todos, data))
    }
}

const mapStateToProps = ({ app }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess
    }
}

CreateTodo.propTypes = {
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    create: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo)