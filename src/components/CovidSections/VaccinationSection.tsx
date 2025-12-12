import { useEffect, useRef, useState } from "react";
import { VaccinationProgress } from "../Charts";
import type { RecoveryTestingData } from "../Charts/VaccinationProgress";
import styles from "./VaccinationSection.module.scss";

interface VaccinationSectionProps {
	data: RecoveryTestingData[];
	percentage: number;
	animate?: boolean;
}

const VaccinationSection = ({
	data,
	percentage,
	animate = true,
}: VaccinationSectionProps) => {
	const [selectedCountries, setSelectedCountries] = useState<string[]>(
		data.slice(0, 5).map((d) => d.label),
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	const handleCountryToggle = (country: string) => {
		setSelectedCountries((prev) => {
			if (prev.includes(country)) {
				return prev.filter((c) => c !== country);
			}
			if (prev.length >= 5) {
				// Replace the last country if already at max
				return [...prev.slice(0, 4), country];
			}
			return [...prev, country];
		});
	};

	const filteredData = data.filter((d) => selectedCountries.includes(d.label));
	return (
		<section className={styles.vaccinationSection}>
			<div className={styles.header}>
				<h2 className={styles.title}>Recovery & Testing Statistics</h2>
				<div className={styles.headerActions}>
					<div className={styles.dropdownContainer} ref={dropdownRef}>
						<button
							type="button"
							className={styles.dropdownButton}
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							aria-label="Select countries"
						>
							<span>Countries ({selectedCountries.length}/5)</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								style={{
									transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
									transition: "transform 0.2s",
								}}
							>
								<path d="M7 10l5 5 5-5z" />
							</svg>
						</button>
						{isDropdownOpen && (
							<div className={styles.dropdownMenu}>
								<div className={styles.dropdownHeader}>
									Select up to 5 countries
								</div>
								<div className={styles.dropdownList}>
									{data.map((country) => (
										<label key={country.label} className={styles.dropdownItem}>
											<input
												type="checkbox"
												checked={selectedCountries.includes(country.label)}
												onChange={() => handleCountryToggle(country.label)}
												className={styles.checkbox}
											/>
											<span>{country.label}</span>
										</label>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={styles.progressContainer}>
				<VaccinationProgress
					percentage={percentage || 75}
					data={filteredData}
					width={500}
					height={Math.max(250, filteredData.length * 70 + 70)}
					animate={animate}
				/>
			</div>
		</section>
	);
};

export default VaccinationSection;
