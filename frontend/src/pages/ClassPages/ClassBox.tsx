import { Link } from "react-router-dom"
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function ClassBox(props: any) {
  const navigate = useNavigate()
  const handle = () => {
    sessionStorage.removeItem('stateTest')
    navigate(`/teacher/${props.cl.id}`)

  }
  return (
    <>
      {/* <Link className='a' to={`/teacher/${props.cl.id}`} >{props.cl.name}</Link> */}
      <button className="btn-save px-4 py-2 d-flex flex-column align-items-center" style={{width: '200px'}} onClick={handle}>
        <span>{props.cl.name}</span>
        <span style={{fontSize:'11px'}}>{props.cl.joinCode}</span>
      </button>
    </>
  )
}

export default ClassBox





