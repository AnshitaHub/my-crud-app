import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUser } from "../redux/userActions"; 
import { Formik, Form, Field } from 'formik';
// import DatePicker from 'react-datepicker';
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state) => state.users);

  const existingUser = users.users.find((user) => user.id === parseInt(id));


    // const validationSchema = Yup.object({
    //   // name: Yup.string().min(3, 'Name is too Short').max(70, 'Name is too Long').required('Name is required'),
    //   // // regex format is applied here in email
    //   // email: Yup.string().required('Email is required').matches(
    //   //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   //   "Please enter a valid email"
    //   // ),
    //   // date: Yup.date().required('Date is required'),
    //   // description: Yup.string().required('Description is required'),
    //   // TaskStatus: Yup.string().required('Status is required'),
      
    // });
     const validationSchema = Yup.object({
    title: Yup.string().required('Description is required'),
   completed: Yup.string().required('Status is required'),
  });

  
  const initialValues = {
    // name: existingUser.id,
    // email:  existingUser.email,
    // date: existingUser.date,
    completed: existingUser.completed,
    title: existingUser.title
  };

  const handleSubmit = (values) => {
    dispatch(updateUser({ userId: parseInt(id), ...values }));
    navigate('/');
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow" style={{ maxWidth: '34rem', width: '100%', color: 'purple' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4" style={{ color: 'purple', marginLeft: '1rem' , fontWeight:'bold'}}>Update TODO</h4>
          <Formik
            initialValues={initialValues}
            validationSchema= {validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched }) => {
              return (
                <Form>
                  {/* <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      required
                    />
                    {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleChange}
                      validateOnBlur={true} // Trigger validation on blur
                      value={values.email}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <DatePicker
                      selected={values.date}
                      name="date"
                      className='form-control  mx-2 '
                      placeholderText="DD/MM/YYYY"
                      onChange={(date) => setFieldValue('date', date)}
                      dateFormat="DD/MM/YYYY"
                      required
                    />
                    {errors.date && touched.date ? <div className="text-danger">{errors.date}</div> : null}
                  </div> */}

                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      className="form-control"
                      placeholder="Describe the task.."
                      rows="4"
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      required
                    ></Field>
                    {errors.title && touched.title ? <div className="text-danger">{errors.title}</div> : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <Field
                      as="select"
                      className="form-control"
                      name="completed"
                      onChange={handleChange}
                      value={values.completed}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value= {true} style={{ color: 'green' }}>Completed</option>
                      <option value={false} style={{ color: 'red' }}>Pending</option>
                    </Field>
                    {errors.completed && touched.completed? <div className="text-danger">{errors.completed}</div> : null}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-light w-100 mt-3"
                    style={{ width: '24rem', color: 'purple', border: '1px solid purple' }}
                  >
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Update;