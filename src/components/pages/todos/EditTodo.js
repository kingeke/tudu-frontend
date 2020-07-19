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
import { getTodo } from '../../../store/actions/todosAction'
require('parsleyjs')

export class EditTodo extends Component {

    id = this.props.match.params.id

    formRef = React.createRef()

    initialState = {
        name: '',
        loaded: false,
        formSending: false
    }

    state = this.initialState

    componentDidMount = () => {
        if (this.props.todo) {
            this.setState({
                loaded: true,
                name: this.props.todo.name
            })
        }

        else {
            this.props.getTodo(this.id)
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (this.formRef.current) {
                    $(this.formRef.current).parsley().reset();
                };

                if (nextProps.formSuccess) {
                    this.props.getTodo(this.id)
                    return this.props.history.goBack()
                }
            })
        }

        if (nextProps.todo !== this.props.todo) {
            this.setState({
                loaded: true,
                name: nextProps.todo.name
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
                this.props.edit(this.state, this.id)
            })
        }
    }

    render() {
        return (
            <MainLayout pageTitle="Edit Todo-Item" show={this.state.loaded}>
                <FormLayout>
                    <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit} autoComplete={'off'}>

                        <Name onChange={this.handleChange} name={this.state.name} label="Enter name" placeholder="Enter name" />

                        <CustomButton type="submit" icon='check' loading={this.state.formSending} title='Update' variant='success' onClick={this.handleSubmit} />

                    </Form>
                </FormLayout>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        edit: (data, id) => dispatch(formAction('put', `${apiLinks.todos}/${id}`, data)),
        getTodo: (id) => dispatch(getTodo(false, id))
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
        todo: users.todos.todo
    }
}

EditTodo.propTypes = {
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    edit: PropTypes.func,
    getTodo: PropTypes.func,
    todo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)