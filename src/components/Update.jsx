import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateUser } from "../redux/UserReducer"
import { useState, useEffect } from "react"
import { useParams , useNavigate } from "react-router-dom"

// extracts the id parameter from the URL using the useParams hook from react-router-dom
const Update = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id}  = useParams()
  const users = useSelector((state) => state.users)
  
  const existingUser = users.find((user) => user.id === parseInt(id))
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // to perform sideffect when the component mounts
  useEffect(() => {
    if (existingUser) {
      setName(existingUser.name);
      setEmail(existingUser.email);
    }
  }, [existingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: parseInt(id), name, email }));
    navigate('/');
  };
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
    <div className="card" style={{ width: '20rem' }}>
      <div className="card-body">
        <h4 className="card-title text-center">Update User</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control "
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value = {name}
              required

            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
               value={email}
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Update
