import { useLocation } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import axios from 'axios';


export default function Header() {
    const location = useLocation();
    const currentUserInfo = location.state && location.state.userInfo;
    console.log(currentUserInfo);

    // Sử dụng useState
    const [state, setState] = useState(0);


    useEffect(() => {
        const getLoginStateFrontEnd = async () => {
          try {
            const response = await axios.get('http://localhost:4001/auth/loginState', {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              withCredentials:true
            });
            setState(response.data.state);

            // state = response.data.state;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        getLoginStateFrontEnd();
      }, []);


    if(state === 2){
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid p-2">
                    <div className="navbar-brand" style={{ "marginLeft": "50px" }}>Test Online</div>
                    <div>
                        {/* <a href="/Login" style={{ "marginRight": "20px" }}><button type="button" className="btn btn-primary">Login</button></a> */}
                        <span style={{ "marginRight": "20px" }}>Hello Teacher</span>
                    </div>  
                </div>
            </nav>
        )
    }
    else if (state === 1){
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid p-2">
                    <div className="navbar-brand" style={{ "marginLeft": "50px" }}>Test Online</div>
                    <div>
                        {/* <a href="/Login" style={{ "marginRight": "20px" }}><button type="button" className="btn btn-primary">Login</button></a> */}
                        <span style={{ "marginRight": "20px" }}>Hello Student </span>
                    </div>  
                </div>
            </nav>
        )
    }
    else if (state === 0) {
        console.log(2222)
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid p-2">
                    <div className="navbar-brand" style={{ "marginLeft": "50px" }}>Test Online</div>
                    <div>
                        <a href="/Login" style={{ "marginRight": "20px" }}><button type="button" className="btn btn-primary">Login</button></a>
                    </div>
                </div>
            </nav>
        )
    }
}