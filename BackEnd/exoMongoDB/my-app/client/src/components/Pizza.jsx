import React, {useState} from 'react'
import {Card, Button, Row, Col, Modal} from 'react-bootstrap'
import {GiKnifeFork} from 'react-icons/gi'

const Pizza = (props) => {
    const[taille, setTaille] = useState("small");
    const[quantite, setQuantite] = useState(1);
    const[show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    
            <Card style={{margin:'5px', height:'300px' }}>
                <Card.Img onClick={handleShow}  src={props.lapizza.image} variant='top'/>
                <Card.Body style={{backgroundColor:"#E60606", color:"white"}}>
                    <Card.Title>{props.lapizza.nom}</Card.Title>
                    <Card.Text >
                    <Row>
                            <Col md={6}>
                                <h6>Taille :
                                    <select style={{marginLeft:'5px'}} 
                                            onchange={(e)=> setTaille(e.target.value)}>

                                        {props.lapizza.taille.map(taille => (
                                            <option>{taille}</option>
                                        ))}
                                    </select>
                                </h6>
                            </Col>
                            <Col md={6}>

                                <h6>Quantité :
                                    <select style={{marginLeft:'5px'}} 
                                    onchange={(e)=> setQuantite(e.target.value)}>
                                        {[...Array(10).keys()].map((v,i) => (
                                            <option>{i+1}</option>
                                        ))}
                                    </select>
                                </h6>

                            </Col>
                    </Row>
                    </Card.Text>
                    <Row>
                        <Col md={6}>
                            Prix : {props.lapizza.prix[0][taille]*quantite} €
                        </Col>
                        <Col md={6}>
                            <Button style={{width:'80px', border:"solid 1px #E60606"}}className='bg-warning text-light' >Add</Button>
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.lapizza.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{height:"180px"}} src={props.lapizza.image} alt='pizza'/>
          <h4>Description</h4>
          <h5><GiKnifeFork></GiKnifeFork>{props.lapizza.categorie}</h5>
          <p>{props.lapizza.description}</p>
        </Modal.Body>
       
      </Modal>
    
  
    
    </>
  )
}

export default Pizza;