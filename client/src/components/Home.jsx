import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../redux/UserReducer";
import fetchUser from "../redux/userActions";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const users = useSelector((state) => state.users) || [];
  console.log('users', users.users);

  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
    console.log(id);
  }
  console.log(">>>>>>>>>", typeof (users.users));

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card w-100 mx-3 my-5" style={{ maxWidth: '800px', backgroundColor: '#fdebff' }}>
        <div className="card-body">
          <div className="container">
            <h2 className="mb-5 text-center" style={{ color: '#6c0776' }}>MY TODOS📝</h2>
            <Link to='/create'>
              <button className="btn btn-outline-primary mb-3" style={{ fontSize: '1rem', color: '#6c0776', border: '1px solid #6c0776', borderRadius: '5px', padding: '5px 10px', backgroundColor: '#DFDFDF', fontWeight: 'bold' }}>
                Create +
              </button>
            </Link>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td >{user.TaskStatus}    </td>
                    
                        <td>
                          <Link to={`/edit/${user.id}`}>
                            <button className="btn btn-sm mt-2">
                              <FontAwesomeIcon icon={faEdit} style={{ color: '#6c0776', fontSize: '1rem' }} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-sm ms-1 mt-2"
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ color: 'red', fontSize: '1rem' }} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;