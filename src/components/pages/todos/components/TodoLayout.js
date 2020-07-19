import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { FormatDate } from '../../../assets/Parsers'
import { Label } from '../../../layouts/CustomInputs'

export default function TodoLayout({ todo }) {

    const layout = [
        {
            label: 'Name',
            value: todo.name
        },
        {
            label: 'Completed',
            value: todo.completed ? 'Yes' : 'No'
        },
        {
            label: 'Created On',
            value: <FormatDate date={todo.created_at} withTime />
        },
        {
            label: 'Updated On',
            value: <FormatDate date={todo.updated_at} withTime />
        }
    ]

    return (
        <Card>
            <Card.Body>
                <Row>
                    {
                        layout.map((item, index) => (
                            <Col md={6} key={index} className="py-3">
                                <Label className="form-control-label font-weight-bold" required={false} label={item.label} name={item.label} />
                                <p>{item.value}</p>
                            </Col>
                        ))
                    }
                </Row>
            </Card.Body>
        </Card>
    )
}
