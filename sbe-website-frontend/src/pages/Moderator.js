import React from 'react'
import "../pages/style.css";
import "../App.css";
import AdminNav from '../components/AdminNav';
import { Redirect } from 'react-router-dom';
import { useSelector} from 'react-redux';



function Moderator() {

  const who = useSelector((state) => state.auth);
  if (who.user != null )
  {
    if (who.user.is_moderator == false )
    {
      return <Redirect to="/" />;  
    }
  }

  return (
    <>
    <section style={{height:"100vh"}}>
      <div className="py-5 main-a" >
        <div className="container ">
          <div className=' row d-flex justify-content-center align-items-center h-100'>
            <div className='py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light'>
              <div className='margin'>
              <div className="sidebar row shadow justify-content-center">
                  <AdminNav />
                </div>
                <div className='card-body justify-content-center'>
                <h1 className=' text-center sbe text-light'> SBME DEPARTMENT</h1>
              
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="margin-b"></div>

      </div>
      </section>
    </>
  )
}

export default Moderator


