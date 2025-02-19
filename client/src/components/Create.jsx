import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../redux/userActions';
import { Formik, Form, Field } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';

const Create = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('Description is required'),
   completed: Yup.string().required('Status is required'),
  });

  const formik = {
    initialValues: { id: '', title: '', completed: '' },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      const newId = users.users.length > 0 ? users.users[users.users.length - 1].id + 1 : 1;
      dispatch(createUser({ userId: newId, ...values }));
      navigate('/');
    }
  };


  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow" style={{ maxWidth: '34rem', width: '100%', color: 'purple' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4" style={{ color: 'purple', fontWeight: 'bold' }}>Add TODO</h4>
          <Formik {...formik}>
            {({ handleChange, values, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Description</label>
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
                  <label htmlFor="status" className="form-label">Status</label>
                  <Field
                    as="select"
                    className="form-control"
                    name="completed"
                    onChange={handleChange}
                    value={values.completed}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value={true} style={{ color: 'green' }}>Completed</option>
                    <option value={false} style={{ color: 'red' }}>Pending</option>
                  </Field>
                  {/* {errors.status && touched. ? <div className="text-danger">{errors.completed}</div> : null} */}
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