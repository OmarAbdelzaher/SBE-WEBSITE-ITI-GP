import React from 'react';  
import { Button,Modal} from 'react-bootstrap'; 
import map from "../assets/uploaded-files/bg-image/DepartmentMap.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

 
class DepartmentImg extends React.Component {  
  constructor(){  
    super();  
    this.state={  
      show:false  
    }  
  }  
  handleModal(){  
    this.setState({show:!this.state.show})  
  }  
  render(){  
    return (
      <>
          <div className="modalClass">
            <Link
              style={{ textDecoration: "none", color: "#457b9d" }}
              onClick={() => this.handleModal()}
            >
              <FontAwesomeIcon icon={faMapLocationDot} /> Department Map
            </Link>
          </div>

          <Modal
            size="lg"
            show={this.state.show}
            onHide={() => this.handleModal()}
          >
            <Modal.Header closeButton>Department Map</Modal.Header>
            <Modal.Body className="text-center">
            <img src={map} />{" "}
            </Modal.Body>
          </Modal>
      </>
    );  
  }  
}  
export default DepartmentImg;  
