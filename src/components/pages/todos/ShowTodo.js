import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { apiLinks } from '../../../routes/ApiLinks'
import { routeLinks } from '../../../routes/NavLinks'
import { formAction } from '../../../store/actions/formActions'
import { getTodo } from '../../../store/actions/todosAction'
import { CustomButton } from '../../layouts/CustomInputs'
import MainLayout from '../../layouts/MainLayout'
import TodoLayout from './components/TodoLayout'
require('parsleyjs')

export class ShowTodo extends Component {

    id = this.props.match.params.id

    formRef = React.createRef()

    initialState = {
        loaded: false,
        formSending: false
    }

    state = this.initialState

    componentDidMount = () => {
        if (this.props.todo) {
            this.setState({
                loaded: true,
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

                this.props.getTodo(this.id)
            })
        }

        if (nextProps.todo !== this.props.todo) {
            this.setState({
                loaded: true,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            formSending: true
        }, () => {
            const todo = this.props.todo

            if (todo.completed) {
                this.props.delete(this.id)
                return this.props.history.push(routeLinks.index)
            }

            this.props.complete(this.id)
        })
    }

    render() {
        const { todo } = this.props

        return (
            <MainLayout pageTitle={todo.name} show={this.state.loaded}>
                <div className="d-flex">
                    {
                        !todo.completed &&
                        <Form.Group>
                            <NavLink
                                exact={true}
                                to={`${routeLinks.todos.show}/${todo.id}/edit`}
                                className="btn btn-info mr-3"
                            >
                                <i className="fas fa-edit"></i> Edit
                            </NavLink>
                        </Form.Group>
                    }
                    <CustomButton
                        type="submit"
                        icon={todo.completed ? 'exclamation-circle' : 'check-circle'}
                        loading={this.state.formSending}
                        title={todo.completed ? 'Delete' : 'Complete'}
                        variant={todo.completed ? 'danger' : 'success'}
                        onClick={this.handleSubmit}
                    />
                </div>
                <TodoLayout
                    todo={todo}
                />
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        complete: (id) => dispatch(formAction('post', `${apiLinks.todos}/${id}/complete`)),
        delete: (id) => dispatch(formAction('delete', `${apiLinks.todos}/${id}`)),
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

ShowTodo.propTypes = {
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    complete: PropTypes.func,
    delete: PropTypes.func,
    getTodo: PropTypes.func,
    todo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTodo)