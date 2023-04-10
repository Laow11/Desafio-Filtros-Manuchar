import s from "../Navbar/Navbar.module.css";
import icon from "../icon/logic_settings_idea_software_developer_icon_251445.png";
export default function NavBar() {
  return (
    <header>
      <div className={s.navbar}>
        <img src={icon} alt="not found" width="50" height="50" />
        <p className={s.text}>Challenge! Create to Lautaro Gayoso</p>
      </div>
    </header>
  );
}
