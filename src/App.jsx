import { RouterProvider } from "react-router-dom";
import MainRouter from "./Routes/MainRouter";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={MainRouter} />
      
      
      <ToastContainer
        position="top-right"
        autoClose={3000}          
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={true}        
      />
    </>
  );
}

export default App;
