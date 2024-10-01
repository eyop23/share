// import Layout from '../shareholder'

// import React from 'react'
// import PropTypes from 'prop-types'
// import { FiAlertCircle } from 'react-icons/fi'
// import { IoMdInformationCircle } from 'react-icons/io'

// const NewsCard = ({adminnews}) => {
//   // const icon = type === 'alert' ? <FiAlertCircle /> : <IoMdInformationCircle />
//   // console.log(news.title)
//   console.log(adminnews)

//   return (
//     <>

//    {adminnews.map(item => (
//           <h1>
//             <div></div>{item.title}
//             {item.author}
//             {item.description}
//             {item.content}
//           </h1>

//         ))}
//     </>)
//     // {/* <div className="font-bold">{adminnews}</div> */}
//     // <div className="bg-white rounded-lg shadow-md p-4 mt-10 mb-4 flex items-center">
//     //   <div className="mr-4 text-indigo-500">{icon}</div>
//     //   <div>

//     //     <div className="font-bold">{title}</div>

//     //     <div className="text-gray-500">{description}</div>
//     //     {image && (
//     //       <div className="mt-4">

//     //         <img src={image} alt={title} className="rounded-lg" />
//     //       </div>
//     //     )}
//     //   </div>
//     //   <div>sdlk</div>

//   // )
// }

// // NewsCard.propTypes = {
// //   title: PropTypes.string.isRequired,
// //   description: PropTypes.string.isRequired,
// //   type: PropTypes.oneOf(['alert', 'info']).isRequired,
// //   image: PropTypes.string,
// // }

// export default NewsCard

import Layout from "../shareholder";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { baseUrl } from "../../constants/constant.js";

const AdminNewsCard = ({ adminnews }) => {
  const [user, setUser] = useState(null); // Local state for user
  const config = user
    ? {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    : null; // Set config only when the user is available

  // Ensure sessionStorage is accessed only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set the user once sessionStorage is available
      }
    }
  }, []);

  const handleDelete = async (id) => {
    if (!config) {
      console.error("User is not logged in.");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}api/adminnews/${id}`, config);
      const data = await response.json();
      if (response.ok) {
        console.log("Deleted successfully:", data);
      } else {
        console.error("Failed to delete:", data);
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <>
      {adminnews &&
        adminnews.map((item) => (
          <div key={item._id}>
            <div className="w-full h-auto p-8 shadow-2xl shadow-black rounded-xl items-center ">
              <div className="font-bold text-blue-700">{item.title}</div>
              <p>{item.author}</p>
              <p>{item.description}</p>
              <p>{item.content}</p>
              <div
                className="bg-mint text-mint fill-current"
                style={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.image}
                  width="200"
                  height="200"
                  style={{
                    objectFit: "cover", // Ensures the image covers the dimensions without distortion
                    width: "200px", // Explicitly set width
                    height: "200px", // Explicitly set height
                  }}
                  alt={item.title} // Always good to have alt text for accessibility
                />
              </div>
              <p className="italic text-normal text-right text-blue-950 pb-0 ">
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <form action="" method="post">
                <div>
                  <button
                    className="flex text-center ml-4 bg-red-700"
                    type="button" // Use type "button" to prevent default form submission
                    onClick={(e) => {
                      e.preventDefault(); // Prevent page refresh
                      handleDelete(item._id); // Call the delete function
                    }}
                  >
                    <RiDeleteBin6Fill className="mt-1 mr-2 ml-1" />
                    <span> Delete </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
    </>
  );
};

export default AdminNewsCard;
