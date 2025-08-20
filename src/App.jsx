import { RouterProvider } from "react-router-dom";
import MainRouter from "./Routes/MainRouter";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={MainRouter} />
      
      {/* ✅ Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}          // 3 sec me close
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={true}        // X button enable
      />
    </>
  );
}

export default App;
