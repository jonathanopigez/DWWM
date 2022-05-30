import React from 'react'
import {Container, Row, Col, Table, Image} from "react-bootstrap"
import {FiPhoneCall} from 'react-icons/fi'
import {ImMobile} from 'react-icons/im'
import {AiOutlineMail} from 'react-icons/ai'


 const Contact = () => {
  return (
    <>
    
    <Container  style ={{marginTop: '50px', display :"flex", justifyContent:'center'}}>
        <Row>
            <Col md={11} >
                <h1>Pizza Delicious</h1>
                <h2>Notre adressz :</h2>
                <p>103, Rue des Olives noires</p>
                <p>75021 Paris</p>
                <p>POUR VOTRE INFORMATION! Nous offrons un service traiteur complet pour tout évènement, grand ou petit. Nous comprenons vos besoins et nous préparerons nos plats pour satisfaire les critères les plus importants, à la fois esthétiques et gustatifs.</p>
                <Table style={{textAlign: "center"}} striped bordered hover>
  <thead>
    <tr>
      <th style={{backgroundColor: "#FFC700" }} colSpan={3}>-- Nos Coordonées --</th>
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><FiPhoneCall/></td>
      <td>Téléphone</td>
      <td>01 23 45 67 89</td>
      
    </tr>
    <tr>
      <td><ImMobile/></td>
      <td>Portable</td>
      <td>01 98 76 54 32</td>
     
    </tr>
    <tr>
      <td><AiOutlineMail/></td>
      <td >Email</td>
      <td>contact@pizza-delicious.com</td>
      
    </tr>
  </tbody>
</Table>
            </Col>
        </Row>
        <Image style={{height:"460px"}} src='https://st.depositphotos.com/1003814/5052/i/950/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg'/>
    </Container>

    </>
  )
}
export default Contact;