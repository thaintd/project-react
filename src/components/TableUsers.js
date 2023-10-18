import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import Button from "react-bootstrap/Button";
import ModelEditUser from "./ModelEditUser";
import ModalConfirm from "./ModalConfirm";
import "./Table.scss";

import _ from "lodash";

const TableUsers = (props) => {
  const [userList, setUserList] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [userTotal, setUsertotal] = useState(0);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [iShowModelAddNew, setIShowModelAddNew] = useState(false);
  const [isShowModelEdit, setIsShowModelEdit] = useState(false);

  const [dataUser, setDataUser] = useState({});
  const [userDelete, setUserDelete] = useState({});

  const handSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const first5Users = userList.slice(0, 6);
    const sortedList = _.sortBy(first5Users, [sortField], [sortBy]);
    setUserList([...sortedList, ...userList.slice(6)]);
  };

  const handleClose = () => {
    setIShowModelAddNew(false);
    setIsShowModelEdit(false);
    setIsShowModalDelete(false);
  };
  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      const firstFiveUsers = res.data.slice(0, 5); // Lấy 5 phần tử đầu tiên
      setUserList(firstFiveUsers);
      setPageTotal(res.total_pages);
      setUsertotal(res.total);
    }
  };

  const handlePageClick = (event) => {
    getUsers(event.selected + 1);
  };
  const handleUpdateTables = (user) => {
    setUserList([user, ...userList]);
  };
  const handleEditUserFromModal = (user) => {
    let cloneUserList = _.cloneDeep(userList);
    let index = userList.findIndex((item) => item.id === user.id);
    cloneUserList[index].first_name = user.first_name;
    setUserList(cloneUserList);
  };
  const handleDeleteUserFromModal = (user) => {
    let cloneUserList = _.cloneDeep(userList);
    cloneUserList = cloneUserList.filter((item) => item.id !== user.id);
    setUserList(cloneUserList);
  };
  const handleEditUser = (user) => {
    setDataUser(user);
    setIsShowModelEdit(true);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setUserDelete(user);
  };
  return (
    <>
      <div className="my-3 add-new d-flex justify-content-between">
        <h3>List Users </h3>
        <Button variant="success" onClick={() => setIShowModelAddNew(true)}>
          ADD NEW
        </Button>{" "}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="header">
                <span>Id</span>
                <span>
                  <i
                    onClick={() => handSort("desc", "id")}
                    className="fa-solid fa-arrow-down"
                  ></i>
                  <i
                    onClick={() => handSort("asc", "id")}
                    className="fa-solid fa-arrow-up"
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="header">
                <span>First Name</span>
                <span>
                  <i
                    onClick={() => handSort("desc", "first_name")}
                    className="fa-solid fa-arrow-down"
                  ></i>
                  <i
                    onClick={() => handSort("asc", "first_name")}
                    className="fa-solid fa-arrow-up"
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((item, index) => {
              return (
                <tr key={`user- ${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteUser(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageTotal}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew
        handleUpdateTables={handleUpdateTables}
        show={iShowModelAddNew}
        handleClose={handleClose}
      />
      <ModelEditUser
        show={isShowModelEdit}
        handleClose={handleClose}
        user={dataUser}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        user={userDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
