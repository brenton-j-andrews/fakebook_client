import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function NavbarBrand() {
    return (
        <>
            <Navbar className="primary-blue header d-flex justify-content-left">
                <Container className="d-flex align-items-center" fluid>
                    <Navbar.Brand className="logo-font fs-1 text-white d-flex mx-3 mt-1" href='/'> FakeBook </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarBrand;
