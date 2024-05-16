import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { removeFromCart, reset } from '../redux/cartSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [user, setUser] = useState({})
  const [ordered, setordered] = useState(false);
  const Navigate = useNavigate();


  useEffect(() => {
    let x = sessionStorage.getItem('user');
    let y = localStorage.getItem('user');
    setUser(JSON.parse(y) || JSON.parse(x));
  }, []); // No need for user as a dependency here

  useEffect(() => {
    if (!user) {
      Navigate('/login');
    }
  }, [user]); // Add user as a dependency here
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const createOrder = async () => {
    const data = {
      fullname: formik.values.fullname,
      user_address: formik.values.user_address,
      phone: formik.values.phone,
      books: cart.order.books,
      total_price: cart.order.totalAmount
    };

    try {
      const res = await axios.post('http://127.0.0.1/phpreactcrud/api/orders.php', data);
      if (res.data.success) {
        console.log("Order created successfully");
        setordered(true);
        // Manually reset form values
        formik.setValues({
          fullname: '',
          phone: '',
          user_address: ''
        });
        dispatch(reset())
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = (productId, quantity, price) => {
    dispatch(removeFromCart({ id: productId, quantity, price }));
  };

  const formik = useFormik({
    enableReinitialize: true, // Enable reinitialization
    initialValues: {
      fullname: user?.fullname || "",
      phone: user?.phone || "",
      user_address: user?.user_address || "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Full Name is required'),
      phone: Yup.string()
        .matches(/^[0-9]*$/, 'Phone number must contain only digits')
        .required('Phone Number is required')
        .min(11, 'Invalid phone number')
        .max(11, 'Invalid phone number'),
      user_address: Yup.string().required('Address is required'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      createOrder();
      resetForm({ values: initialValues });
      setSubmitting()
    },
  });

  return (
    <div className="bg-gray-200 px-4 pb-8 pt-[20vh] min-h-screen w-screen text-sm md:text-base">
      {/* Cart items */}
      <div className="overflow-auto scrollbar">
        {!!cart?.cart?.length && (
          <table className="basic">
            {/* Table header */}
            <thead>
              <tr>
                <th>Product</th>
                <th className="min-w-[150px]">Name</th>
                <th className="min-w-[60px]">Price</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {cart.cart.map((product) => (
                <tr key={product.id} className="text-blue-900">

                  <td>
                    <div className='flex justify-center items-center'>
                      <img src={product.image} alt="" className=' max-h-[50px]' />
                    </div>
                  </td>
                  <td>
                    <span>{product.title}</span>
                  </td>
                  <td>
                    <span>{product.price} £</span>
                  </td>
                  <td>
                    <span>{product.quantity}</span>
                  </td>
                  <td>
                    <div
                      className="bg-red-700 cursor-pointer w-[200px] text-center mx-auto text-white px-2 py-1 rounded-md"
                      onClick={() => handleRemove(product.id, product.quantity, product.price)}
                    >
                      Remove
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order form */}
      <div className="w-[100%] flex justify-center">
        <div className={`max-w-[400px] h-fit mt-16 text-blue-900 p-1 flex justify-center box rounded overflow-hidden w-80 max-w-full flex items-center justify-center relative bg-white ${!!cart?.cart?.length ? "after:w-[170px]  after:h-[200%]" : "after:w-[0]  after:h-[0%]"}  after:bg-blue-600 after:absolute z-10 after:z-[-1]`}>
          <div className="bg-white min-w-[200px] w-[100%] rounded-md py-5 px-3 h-[100%] flex gap-2 flex-col justify-evenly">
            {!!cart?.cart?.length ? (
              <>
                <h2 className="font-capriola text-[30px] text-blue-900 text-center">CART TOTAL</h2>
                <div className="text-lg font-bold">
                  <b className="font-capriola">Total: </b>{cart.order.totalAmount} £
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Full Name"
                      className={`block w-full mt-1 p-3 rounded border ${formik.touched.fullname && formik.errors.fullname ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullname}
                    />
                    {formik.touched.fullname && formik.errors.fullname && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.fullname}</p>
                    )}
                  </div>
                  {/* Phone number field */}
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Phone Number"
                      className={`block w-full mt-1 p-3 rounded border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                    )}
                  </div>
                  {/* Address field */}
                  <div className="mb-4">
                    <label htmlFor="user_address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      id="user_address"
                      name="user_address"
                      type="text"
                      placeholder="Address"
                      className={`block w-full mt-1 p-3  rounded border ${formik.touched.user_address && formik.errors.user_address ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.user_address}
                    />
                    {formik.touched.user_address && formik.errors.user_address && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.user_address}</p>
                    )}
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-white hover:border-2 hover:border-blue-600 hover:text-blue-600 duration-1000"
                  >
                    OK
                  </button>
                </form>
              </>
            ) : (
              <h2 className="font-capriola text-[30px] text-blue-900 text-center">{ordered ? 'order created' : 'Empty cart'}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
