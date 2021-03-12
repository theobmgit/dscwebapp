import React, { Component } from "react";
import ReactTable from "react-table-6";
import apis from "../api";

import styled from "styled-components";

import "react-table-6/react-table.css";

const Wrapper = styled.div`
  margin: 50px auto;
  max-width: 1100px;
`;
const Update = styled.div`
  font-weight: bold;
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  font-weight: bold;
  color: #ff0000;
  cursor: pointer;
`;

class UpdateStudent extends Component {
  updateStudent = (event) => {
    event.preventDefault();
    window.location.href = `/students/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateStudent}>Update</Update>;
  }
}

class DeleteStudent extends Component {
  deleteUser = (event) => {
    event.preventDefault();
    if (
      window.confirm(`Do you want to delete ${this.props.name} permanently?`)
    ) {
      apis.deleteStudentById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      columns: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await apis.getAllStudents().then((students) => {
      this.setState({
        students: students.data.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { students, isLoading } = this.state;
    console.log("TCL: StudentsList -> render -> students", students);

    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true,
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
      },
      {
        Header: "Age",
        accessor: "age",
        filterable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
      },
      {
        Header: "Class",
        accessor: "class",
        filterable: true,
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <DeleteStudent
                id={props.original._id}
                name={props.original.name}
              />
            </span>
          );
        },
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <UpdateStudent id={props.original._id} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!students.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={students}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Wrapper>
    );
  }
}

export default StudentsList;
