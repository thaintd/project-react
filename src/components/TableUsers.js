import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";
import ReactPaginate from "react-paginate";

const TableUsers = (any) => {
  const [userList, setUserList] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [userTotal, setUsertotal] = useState(0);
  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      setUserList(res.data);
      setPageTotal(res.total_pages);
      setUsertotal(res.total);
      console.log(res);
    }
  };
  console.log(userList);
  const handlePageClick = (event) => {
    getUsers(event.selected + 1);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
    </>
  );
};

export default TableUsers;
