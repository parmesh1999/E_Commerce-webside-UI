import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Customer() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

  const [addUpdateModal, setAddUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const baseUrl = "http://localhost:7000/api/Customer";

  const fetchData = () => {
    axios.get(baseUrl)
      .then(res => setList(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUpdate = () => {
    const customer = { id, name, email, mobile, password, address };

    const request = id === 0
      ? axios.post(`${baseUrl}`, customer)
      : axios.put(`${baseUrl}/${id}`, customer);

    request.then(() => {
      Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Data saved successfully!", showConfirmButton: false, timer: 1500 });
      fetchData();
      setAddUpdateModal(false);
      resetForm();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Data deleted successfully!", showConfirmButton: false, timer: 1500 });
        fetchData();
      });
  };

  const handleEdit = (obj) => {
    setId(obj.id);
    setName(obj.name);
    setEmail(obj.email);
    setMobile(obj.mobile);
    setPassword(obj.password);
    setAddress(obj.address);
    setAddUpdateModal(true);
  };

  const handleView = (obj) => {
    setId(obj.id);
    setName(obj.name);
    setEmail(obj.email);
    setMobile(obj.mobile);
    setPassword(obj.password);
    setAddress(obj.address);
    setViewModal(true);
  };

  const handleDownload = () => {
    const csvContent = `Id,Name,Email,Mobile,Password,Address\n${list.map(c => `${c.id},${c.name},${c.email},${c.mobile},${c.password},${c.address}`).join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "customers.csv";
    link.click();
  };

  const resetForm = () => {
    setId(0);
    setName("");
    setEmail("");
    setMobile("");
  };

  const filteredList = list.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedList = filteredList.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredList.length / pageSize);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-2 gap-2">
        <h4>👤 Customer Management</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => { resetForm(); setAddUpdateModal(true); }}>
            <i className="bi bi-plus-lg"></i> Add Customer
          </button>
          <button className="btn btn-success" onClick={handleDownload}>📥 Export CSV</button>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3 gap-2">
        <input type="text" className="form-control" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ maxWidth: "250px" }} />
        <div>
          <label className="me-2">Items per page:</label>
          <select className="form-select d-inline-block w-auto" value={pageSize} onChange={(e) => { setPageSize(parseInt(e.target.value)); setCurrentPage(1); }}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr><th>Id</th><th>Name</th><th>Email</th><th>Mobile</th><th>Password</th><th>Address</th><th>Action</th></tr>
        </thead>
        <tbody>
          {paginatedList.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.mobile}</td>
                <td>{c.password}</td>
                <td>{c.address}</td>
              <td>
                <button className="border-0 bg-transparent me-2" onClick={() => handleEdit(c)}><i className="bi bi-pencil-fill text-primary fs-5"></i></button>
                <button className="border-0 bg-transparent me-2" onClick={() => handleDelete(c.id)}><i className="bi bi-trash-fill text-danger fs-5"></i></button>
                <button className="border-0 bg-transparent" onClick={() => handleView(c)}><i className="bi bi-eye-fill text-success fs-5"></i></button>
              </td>
            </tr>
          ))}
          {paginatedList.length === 0 && (
            <tr><td colSpan="7" className="text-center">No data found.</td></tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination pagination-sm justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Add / Update Modal */}
      {addUpdateModal && (
        <>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">{id === 0 ? "Add" : "Update"} Customer</h5>
                  <button type="button" className="btn-close" onClick={() => setAddUpdateModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input className="form-control mb-2" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="form-control mb-2" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input className="form-control" placeholder="Enter Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    <input className="form-control mb-2" placeholder="Enter Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input className="form-control mb-2" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setAddUpdateModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAddUpdate}>Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* View Modal */}
      {viewModal && (
        <>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Customer Details</h5>
                  <button type="button" className="btn-close" onClick={() => setViewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Id:</strong> {id}</p>
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Mobile:</strong> {mobile}</p>
                    <p><strong>Password:</strong> {password}</p>
                    <p><strong>Address:</strong> {address}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setViewModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default Customer;
