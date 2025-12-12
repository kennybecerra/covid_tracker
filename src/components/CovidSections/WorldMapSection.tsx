import type { CountryDataMap } from "../Charts";
import { WorldMap } from "../Charts";
import styles from "./WorldMapSection.module.scss";

interface WorldMapSectionProps {
	data: CountryDataMap;
}

const WorldMapSection = ({ data }: WorldMapSectionProps) => {
	return (
		<section className={styles.worldMapSection}>
			<div className={styles.mapContainer}>
				<WorldMap
					data={data}
					width={520}
					height={350}
					colorScale={["#d8e6ef", "#407db6"]}
				/>
			</div>
		</section>
	);
};

export default WorldMapSection;
