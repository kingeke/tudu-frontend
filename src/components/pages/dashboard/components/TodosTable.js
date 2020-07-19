import PropTypes from 'prop-types'
import React from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Hr } from '../../../layouts/CustomLayouts'
import Filters from '../../../layouts/Filters'
import TableLayout from '../../../layouts/TableLayout'
import TodoTableComponent from '../../../layouts/TodoTableComponent'
import { NavLink } from 'react-router-dom'
import { routeLinks } from '../../../../routes/NavLinks'

function TodosTable({ loaded, todos, handleView, handleFilterChange, state }) {

    const columns = ['S/N', 'Actions', 'Name', 'Completed', 'Created On', 'Update On']

    const fields = ['s_n', 'actions', 'name', 'completed', 'created_at', 'updated_at']

    const actions = ['view', 'edit']

    return (
        <Card className="shadow-sm my-5">
            <Card.Body>
                <Card.Title className="font-weight-bold">Recent Items</Card.Title>
                <Hr align="left" />
                <div className="mb-3 d-flex justify-content-between">
                    <div>
                        <h6>Filters: </h6>
                        <Filters
                            handleFilterChange={handleFilterChange}
                            state={state}
                        />
                    </div>
                    <div>
                        <NavLink exact={true} to={routeLinks.todos.create} className="btn btn-info">
                            Create
                        </NavLink>
                    </div>
                </div>
                <TableLayout loading={!loaded} columns={columns}>
                    {
                        todos && todos.map((todo, index) => (
                            <TodoTableComponent
                                handleView={handleView}
                                actions={actions}
                                todo={todo}
                                fields={fields}
                                serial={index + 1}
                                key={index}
                            />
                        ))
                    }
                </TableLayout>
            </Card.Body>
        </Card>
    )
}

TodosTable.propTypes = {
    todos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    loaded: PropTypes.bool,
    handleView: PropTypes.func
}

const mapStateToProps = ({ users }) => {
    return {
        loaded: users.todos.loaded,
        todos: users.todos.todos
    }
}

export default connect(mapStateToProps)(TodosTable)
