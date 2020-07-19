import PropTypes from 'prop-types'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FormatNumber } from '../../../assets/Parsers'

function CardOverview({ todos = [] }) {

    var cards = [
        {
            title: 'Total',
            number: todos.length,
            color: 'primary',
            icon: 'list-alt'
        },
        {
            title: 'Unfulfilled',
            number: todos.filter(i => !i.completed).length,
            color: 'warning',
            icon: 'list-alt'
        },
        {
            title: 'Completed',
            number: todos.filter(i => i.completed).length,
            color: 'success',
            icon: 'list-alt'
        }
    ]

    return (
        <Row>
            {
                cards.map((item, index) => (
                    <Col lg={4} md={6} key={index} className="mb-3">
                        <Card body className={`shadow-sm border-${item.color}`}>
                            <Row>
                                <Col xs={7}>
                                    <p className="text-muted">{item.title}</p>
                                    <p className="font-weight-bold text-black">
                                        <FormatNumber number={item.number} withNaira={item.withNaira} />
                                    </p>
                                </Col>
                                <Col xs={3}>
                                    <span className="fa-stack fa-2x">
                                        <i className={`fas fa-circle fa-stack-2x text-${item.color}`}></i>
                                        <i className={`fas fa-${item.icon} fa-stack-1x fa-inverse`}></i>
                                    </span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

CardOverview.propTypes = {
    todos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
}

const mapStateToProps = ({ users }) => {
    return {
        todos: users.todos.todos,
    }
}

export default connect(mapStateToProps)(CardOverview)