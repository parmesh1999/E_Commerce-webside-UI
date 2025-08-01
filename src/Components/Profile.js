import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);

  const baseUrl = "http://localhost:7000/api/User";
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${userId}`);
      setUser(res.data.data);
      setFormData({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        mobile: res.data.data.mobile || "",
        password: res.data.data.password || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}/${userId}`, { id: userId, ...formData });
      Swal.fire("Success", "Profile updated!", "success");
      setIsEditing(false);
      fetchUser();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}/${userId}`);
          localStorage.clear();
          Swal.fire("Deleted!", "Your profile has been deleted.", "success").then(() => {
            window.location.href = "/";
          });
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire("Error", "Failed to delete profile.", "error");
        }
      }
    });
  };

  if (!user) return <div className="container mt-4 text-center"><h4>No Profile Found</h4></div>;

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-header bg-primary text-white text-center">
          <h5>👤 My Profile</h5>
        </div>
        <div className="card-body">
          {isEditing ? (
            <>
              <input className="form-control mb-2" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input className="form-control mb-2" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input className="form-control mb-2" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
              <input className="form-control mb-3" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
              <button className="btn btn-success me-2" onClick={handleUpdate}>✅ Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <p><strong>🧑 Name:</strong> {user.name}</p>
              <p><strong>📧 Email:</strong> {user.email}</p>
              <p><strong>📱 Mobile:</strong> {user.mobile}</p>
              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary w-45" onClick={() => setIsEditing(true)}>✏️ Edit</button>
                <button className="btn btn-danger w-45" onClick={handleDelete}>🗑️ Delete</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
