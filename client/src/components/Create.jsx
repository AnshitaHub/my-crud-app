import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../redux/UserReducer';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';

const Create = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name is too Short').max(70, 'Name is too Long').required('Name is required'),
    // regex format is applied here in email
    email: Yup.string().required('Email is required').matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ),
    date: Yup.date().required('Date is required'),
    description: Yup.string().required('Description is required'),
    TaskStatus: Yup.string().required('Status is required'),
  });

  const formik = {
    initialValues: { name: '', email: '', date: '', description: '', TaskStatus: '' },
    validationSchema: validationSchema,
    validateOnBlur: true, // Trigger validation on blur
    // here values iss an object that holds the entire form's statee or  data
    onSubmit: (values) => {
      const newId = users.users[users.users.length - 1].id + 1;
      dispatch(addUser({ id: newId, ...values }));
      console.log(users);
      navigate('/');
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow" style={{maxWidth: '34rem', width: '100%',  color: 'purple' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4" style={{ color: 'purple', fontWeight:'bold' }}>Add TODO</h4>
          <Formik {...formik}>
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form>
                <div className="mb-3">
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
                      {errors.email && touched.email? <div className="text-danger">{errors.email}</div> : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <DatePicker
// DatePicker returns a Date object, while handleChange expects an event object.So I should used setFieldValue to update the date field.
                    selected={values.date}  
                    name="date"
                    className='form-control  mx-2 '
                    placeholderText="DD/MM/YYYY"
                    onChange={(date) => setFieldValue('date', date)}
                    dateFormat="DD/MM/YYYY"
                    required
                  />
                  {errors.date && touched.date? <div className="text-danger">{errors.date}</div> : null}
                
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    className="form-control"
                    placeholder="Describe the task.."
                    rows="4"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    required
                  ></Field>
                  {errors.description && touched.description? <div className="text-danger">{errors.description}</div> : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <Field
                    as="select"
                    className="form-control"
                    name="TaskStatus"
                    onChange={handleChange}
                    value={values.TaskStatus}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="Completed" style={{ color: 'green' }}>Completed</option>
                    <option value="Pending" style={{ color: 'red' }}>Pending</option>
                  </Field>
                  {errors.TaskStatus && touched.TaskStatus? <div className="text-danger">{errors.TaskStatus}</div> : null}
                </div>

                <button
                  type="submit"
                  className="btn btn-light w-100 mt-3"
                  style={{ width: '24rem', color: 'purple', border: '1px solid purple' }}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Create;