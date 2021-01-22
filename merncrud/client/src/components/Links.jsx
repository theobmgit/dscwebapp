import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    DSC HUST DATABASE
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/students/list" className="nav-link">
                                Students
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/students/create" className="nav-link">
                                New Student
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links