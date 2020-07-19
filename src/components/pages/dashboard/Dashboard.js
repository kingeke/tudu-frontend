import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTodos, getTodo } from '../../../store/actions/todosAction'
import MainLayout from '../../layouts/MainLayout'
import CardOverview from './components/CardOverview'
import TodosTable from './components/TodosTable'

export class Dashboard extends Component {

    initialState = {
        pageLoading: false,
        filterLoading: false,
        filters: {
            unfulfilled: false,
            completed: false
        }
    }

    state = this.initialState

    componentDidMount = () => {
        this.props.getTodos(this.state.filters)
    }

    handleView = (todo) => {
        this.props.getTodo(todo)
    }

    handleFilterChange = (e) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [e.target.name]: e.target.checked
            }
        }, () => {
            this.props.getTodos(this.state.filters)
        })
    }

    render() {
        const { loaded } = this.props

        return (
            <MainLayout show={loaded} pageTitle="Dashboard">
                <div className="main">
                    <CardOverview />
                    <TodosTable
                        handleFilterChange={this.handleFilterChange}
                        state={this.state}
                        handleView={this.handleView}
                    />
                </div>
            </MainLayout>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTodos: (filters) => dispatch(getTodos(filters)),
        getTodo: (todo) => dispatch(getTodo(todo))
    }
}

const mapStateToProps = ({ users }) => {
    return {
        loaded: users.todos.loaded,
    }
}

Dashboard.propTypes = {
    loaded: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)