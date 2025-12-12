import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.topRow}>
				<div className={styles.brand}>
					<span className={styles.statusDot}></span>
					<h1 className={styles.title}>COVID-19 Tracker</h1>
				</div>
			</div>
			<nav className={styles.nav}>
				<NavLink
					exact
					to="/"
					className={styles.navLink}
					activeClassName={styles.active}
				>
					Overview
				</NavLink>
				<NavLink
					to="/map"
					className={styles.navLink}
					activeClassName={styles.active}
				>
					Map
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
