import NavDropdown from 'react-bootstrap/NavDropdown';
export default function HeaderTeacher() {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white  mb-4 static-top shadow d-flex justify-content-end">

            <div>
                <NavDropdown title="User Information" id="basic-nav-dropdown">
                    {/* <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#">Settings</NavDropdown.Item> */}
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                </NavDropdown>
            </div>
        </nav>
    )
}

