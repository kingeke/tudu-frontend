import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { routeLinks } from '../../routes/NavLinks';
import { FormatDate } from '../assets/Parsers';

export default function TodoTableComponent({ todo, fields, actions, serial, handleView }) {

    const data = fields.map((value, index) => {
        return (
            <td key={index} className={value === 'actions' ? 'text-center' : ''}>

                {value === 's_n' && serial}

                {value === 'name' && todo.name}

                {value === 'completed' && (todo.completed ? 'Yes' : 'No')}

                {value === 'created_at' && <FormatDate date={todo.created_at} withTime />}

                {value === 'updated_at' && <FormatDate date={todo.updated_at} withTime />}

                {
                    value === 'actions' &&
                    actions.map((value, index) => {
                        return (
                            <span key={index}>
                                {
                                    value === 'view' &&
                                    <NavLink key={index} exact to={`${routeLinks.todos.show}/${todo.id}`} onClick={() => handleView(todo)}><i className="fas fa-eye text-info mr-2" title="View todo"></i></NavLink>
                                }

                                {
                                    value === 'edit' && !todo.completed &&
                                    <NavLink key={index} exact to={`${routeLinks.todos.show}/${todo.id}/edit`} onClick={() => handleView(todo)}><i className="fas fa-edit text-warning mr-2" title="Edit todo"></i></NavLink>
                                }
                            </span>
                        )
                    })
                }
            </td>
        )
    })

    return (
        <tr>
            {data}
        </tr>
    )
}

TodoTableComponent.propTypes = {
    todo: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.string),
    serial: PropTypes.number,
    actions: PropTypes.arrayOf(PropTypes.string)
}