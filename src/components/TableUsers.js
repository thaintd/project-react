import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import Button from "react-bootstrap/Button";
import ModelEditUser from "./ModelEditUser";
import ModalConfirm from "./ModalConfirm";
import "./Table.scss";
import { debounce } from "lodash";
import _ from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [exportData, setExportData] = useState([]);
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

    let cloneUserList = _.cloneDeep(userList);
    if (sortField === "id" || sortField === "first_name") {
      cloneUserList = _.orderBy(cloneUserList, [sortField], [sortBy]);
    }

    setUserList(cloneUserList);
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
      setUserList(res.data);
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
  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneUserList = _.cloneDeep(userList);
      cloneUserList = cloneUserList.filter((item) => item.email.includes(term));
      setUserList(cloneUserList);
    } else {
      getUsers(1);
    }
  }, 300);
  const handleExport = (event, done) => {
    let result = [];
    if (userList && userList.length > 0) {
      result.push(["ID", "Email", "FirstName", "LastName"]);
      userList.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
        setExportData(result);

        done();
      });
    }
  };
  const handleImportData = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file");
        return;
      }
      Papa.parse(file, {
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("wrong format header csv");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setUserList(result);
              }
            } else {
              toast.error("wrong format Csv");
            }
          } else {
            toast.error("not found data on csv file!");
          }
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 add-new d-flex justify-content-between">
        <h3>List Users </h3>
        <div className="button-group d-flex ">
          <div className="import ">
            <label htmlFor="test" className="btn btn-danger">
              <i className="fa-solid fa-upload"></i>
              Import
            </label>
            <input
              type="file"
              id="test"
              hidden
              onChange={(event) => {
                handleImportData(event);
              }}
            />
          </div>
          <CSVLink
            className="btn btn-primary mx-5 "
            data={exportData}
            filename={"users.csv"}
            asyncOnClick={true}
            onClick={handleExport}
          >
            <i className="fa-solid fa-download"></i>
            Export
          </CSVLink>
          <Button variant="success" onClick={() => setIShowModelAddNew(true)}>
            <i className="fa-solid fa-plus"></i>
            ADD NEW
          </Button>{" "}
        </div>
      </div>
      <div className="search my-3 col-3">
        <input
          className="form-control"
          placeholder="search here"
          onChange={(event) => {
            handleSearch(event);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="header">
                <span>Id</span>
                <span>
                  <i
                    onClick={() => handSort("asc", "id")}
                    className="fa-solid fa-arrow-up"
                  ></i>
                  <i
                    onClick={() => handSort("desc", "id")}
                    className="fa-solid fa-arrow-down"
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
                    onClick={() => handSort("asc", "first_name")}
                    className="fa-solid fa-arrow-up"
                  ></i>
                  <i
                    onClick={() => handSort("desc", "first_name")}
                    className="fa-solid fa-arrow-down"
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
