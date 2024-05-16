

const Reviews = () => {




  return (
    <div className='h-fit bg-gray-200 flex gap-10 pt-5 pb-5 flex-col items-center' id='reviews'>
      <div>
        <div className="main-header text-center">
          <h1 className=" mx-auto mb-20 p-[15px] border-b-[3px] border-solid border-blue-500 p-30 max-w-max md:text-4xl text-2xl relative">
            Contact Us
            <span className="absolute w-5 h-5 left-1/2 transform -translate-x-1/2 top-[88%] bg-blue-500 rounded-full"></span>
          </h1>
        </div>
        <div className='flex w-screen justify-evenly flex-wrap px-4 py-5 gap-10'>
          <div className="text-blue-900 text-[40px] gap-0 font-capriola h-[100%] flex flex-col justify-between items-center "
          // data-aos="zoom-in-up"
          >
            <span>

              Alternatively please use the response form<br className='hidden md:visible' /> to contact us.

            </span>
            {/* <Icon /> */}

          </div>
          <div className=" box rounded overflow-hidden w-80 max-w-full flex items-center justify-center relative after:w-[170px] bg-white after:h-[200%] after:bg-blue-600 after:absolute z-10 after:z-[-1]">
            <form
              // data-aos="flip-left"
              //   data-aos-easing="ease-out-cubic"
              //   data-aos-duration="2000" 
              className="bg-white p-6 rounded shadow-md w-[99%] h-[99%]">
              <div className="mb-4">
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                  Name Surname
                </label>
                <input
                  id="customer"
                  name="customer"
                  type="text"
                  placeholder="Full Name"
                  className="block w-full mt-1 p-3 rounded border focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="block w-full mt-1 p-3 rounded border focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                  Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={5}
                  placeholder="Your review"
                  className="block w-full mt-1 p-3 rounded border focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-white hover:border-2 hover:border-blue-600 hover:text-blue-600 duration-1000">
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Reviews;
