import "./AdminFooter.css"
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <>
    <section className="Adminsection">
      <footer className="FooterAdmin">
        <div className="socialIconsAdmins">
          <Link to={"https://github.com/sufyan356"}>
            <div className="github"><BsGithub /></div>
          </Link>
          <Link to={"https://www.linkedin.com/in/muhammad-sufyan-839ba8281/"}>
            <div className="linkedin"><FaLinkedin /></div>
          </Link>
        <Link to={"/sufyan-portfolio-webapp.netlify.app/ "}>
            <div className="website"><CgWebsite /></div>
        </Link>
        </div>

        <div className="FooterInner">
          <span className="present">Presented By: </span> <span className="presentName">M.Sufyan</span>
        </div>
      </footer>
    </section>
    </>
   
  )
}

export default AdminFooter