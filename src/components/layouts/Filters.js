import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

export default function Filters({ handleFilterChange, state }) {
    return (
        <Fragment>
            <Form>
                <Form.Group>
                    <Form.Check
                        inline
                        label="Completed"
                        name="completed"
                        id="completed"
                        type="checkbox"
                        onChange={handleFilterChange}
                        value={state.filters.completed}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        inline
                        label="Unfulfilled"
                        id="unfulfilled"
                        name="unfulfilled"
                        type="checkbox"
                        onChange={handleFilterChange}
                        value={state.filters.unfulfilled}
                    />
                </Form.Group>
            </Form>
        </Fragment>
    )
}