import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = () => {
  return (
    <>
      <div className="w-[150px] flex justify-between text-[30px] text-blue-900">
        <a href="https://www.facebook.com/share/QDLANxjv3p5ebNYV/?mibextid=qi2Omg" target="_blank" className="hover:text-blue-600">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/noa1_noa?igsh=enA0MXVnY2x2dHZx" target="_blank" className="hover:text-blue-600">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://wa.me/+201159048067" target="_blank" className="hover:text-blue-600">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
    </>
  )
}

export default Icon