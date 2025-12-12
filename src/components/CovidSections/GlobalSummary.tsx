import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import type { CovidWorldwideData } from "../../api/covid";
import styles from "./GlobalSummary.module.scss";

interface GlobalSummaryProps {
	data: CovidWorldwideData;
	animate?: boolean;
}

const formatNumber = (num: number): string => {
	if (num >= 1000000) {
		return `${(num / 1000000).toFixed(0)}M`;
	}
	if (num >= 1000) {
		return `${(num / 1000).toFixed(0)}K`;
	}
	return num.toString();
};

const AnimatedNumber = ({
	value,
	animate,
}: {
	value: number;
	animate: boolean;
}) => {
	const [hasAnimated, setHasAnimated] = useState(false);

	const { number } = useSpring({
		from: { number: 0 },
		number: animate && !hasAnimated ? value : value,
		config: { duration: 2000 },
	});

	useEffect(() => {
		if (animate && !hasAnimated) {
			setHasAnimated(true);
		}
	}, [animate, hasAnimated]);

	return (
		<animated.div className={styles.kpiValue}>
			{number.to((n) => formatNumber(Math.floor(n)))}
		</animated.div>
	);
};

const GlobalSummary = ({ data, animate = true }: GlobalSummaryProps) => {
	return (
		<section className={styles.globalSummary}>
			<div className={styles.header}>
				<h2 className={styles.title}>Global Summary</h2>
			</div>
			<div className={styles.kpiGrid}>
				<div className={styles.kpiItem}>
					<div className={styles.kpiLabel}>Total Cases</div>
					<AnimatedNumber value={data.cases} animate={animate} />
					<div className={styles.kpiChange}>
						<span className={styles.changeIndicator}>●</span>+
						{(data.todayCases / 1000).toFixed(1)}% today
					</div>
				</div>
				<div className={styles.kpiItem}>
					<div className={styles.kpiLabel}>Active Cases</div>
					<AnimatedNumber value={data.active} animate={animate} />
					<div className={styles.kpiChange}>
						<span className={styles.changeIndicator}>●</span>
						+0.03% today
					</div>
				</div>
				<div className={styles.kpiItem}>
					<div className={styles.kpiLabel}>Total Deaths</div>
					<AnimatedNumber value={data.deaths} animate={animate} />
					<div className={styles.kpiChange}>
						<span className={styles.changeIndicator}>●</span>
						+1 today
					</div>
				</div>
				<div className={styles.kpiItem}>
					<div className={styles.kpiLabel}>Deaths</div>
					<AnimatedNumber value={data.deaths} animate={animate} />
					<div className={styles.kpiChange}>
						<span className={styles.changeIndicatorGreen}>●</span>
						0% today
					</div>
				</div>
			</div>
		</section>
	);
};

export default GlobalSummary;
