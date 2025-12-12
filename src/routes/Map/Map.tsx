import CovidGlobe from "../../components/Globe";
import Header from "../../components/header";
import styles from "./Map.module.scss";

const GlobeMap = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.innerContainer}>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.content}>
					<div className={styles.pageHeader}>
						<h1 className={styles.title}>Global COVID-19 3D Globe</h1>
						<p className={styles.subtitle}>
							Interactive 3D visualization of COVID-19 data by country
						</p>
					</div>
					<CovidGlobe />
				</div>
			</div>
		</div>
	);
};

export default GlobeMap;
