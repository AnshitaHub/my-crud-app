import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../redux/UserReducer";

const Home = () => {

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users);

  const handleDelete = (id) => {
     dispatch(deleteUser({ id }));
     console.log(id);  
      }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '80%', marginBottom: '10em' }}>
        <div className="card-body">
          <div className="container" style={{ marginTop: '2rem' }}>
            <h2 className="mb-5 text-center">A CRUD Application Using REDUX</h2>
            <Link to ='/create'><button className="btn btn-outline-primary my-3 p-2">Create +</button> </Link>
            <table className="table table-striped ">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link to={`/edit/${user.id}`}>
                          <button className="btn btn-sm btn-primary mt-2">Edit</button>
                        </Link>
                        <button onClick={()=>handleDelete(user.id)} className="btn btn-sm btn-danger ms-2 mt-2">Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;