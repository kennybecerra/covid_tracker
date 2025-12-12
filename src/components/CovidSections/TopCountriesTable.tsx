import numeral from "numeral";
import { useState } from "react";
import type { CountryRowData } from "../Charts";
import styles from "./TopCountriesTable.module.scss";

type SortField =
	| "country"
	| "cases"
	| "deaths"
	| "tests"
	| "casesPerOneMillion"
	| "deathsPerOneMillion"
	| "testsPerOneMillion";
type SortOrder = "asc" | "desc";
type ItemsPerPage = 5 | 10 | 20 | 50;

interface TopCountriesTableProps {
	data: CountryRowData[];
	animate?: boolean;
}

const TopCountriesTable = ({
	data,
	animate = true,
}: TopCountriesTableProps) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [sortField, setSortField] = useState<SortField>("cases");
	const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
	const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(10);
	const [currentPage, setCurrentPage] = useState(1);

	const handleColumnClick = (field: SortField) => {
		if (sortField === field) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortOrder("desc");
		}
		setCurrentPage(1); // Reset to first page when sorting changes
	};

	const handleItemsPerPageChange = (items: ItemsPerPage) => {
		setItemsPerPage(items);
		setCurrentPage(1); // Reset to first page when items per page changes
		setShowDropdown(false);
	};

	const sortedData = [...data].sort((a, b) => {
		let valueA: string | number | undefined;
		let valueB: string | number | undefined;

		if (sortField === "country") {
			valueA = a.country.toLowerCase();
			valueB = b.country.toLowerCase();
		} else {
			valueA = a[sortField];
			valueB = b[sortField];
		}

		// Handle undefined values
		if (valueA === undefined && valueB === undefined) return 0;
		if (valueA === undefined) return 1;
		if (valueB === undefined) return -1;

		if (sortOrder === "asc") {
			return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
		} else {
			return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
		}
	});

	// Pagination calculations
	const totalPages = Math.ceil(sortedData.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayData = sortedData.slice(startIndex, endIndex);

	const handlePrevPage = () => {
		setCurrentPage((prev) => Math.max(1, prev - 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages, prev + 1));
	};

	const getSortIcon = (field: SortField) => {
		if (sortField !== field) return "⇅";
		return sortOrder === "asc" ? "↑" : "↓";
	};

	return (
		<section className={styles.topCountries}>
			<div className={styles.header}>
				<h2 className={styles.title}>Top Affected Countries</h2>
				<div className={styles.sortContainer}>
					<button
						className={styles.iconBtn}
						aria-label="Items per page"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
						</svg>
					</button>
					{showDropdown && (
						<div className={styles.dropdown}>
							<button
								onClick={() => handleItemsPerPageChange(5)}
								className={itemsPerPage === 5 ? styles.active : ""}
							>
								5 per page
							</button>
							<button
								onClick={() => handleItemsPerPageChange(10)}
								className={itemsPerPage === 10 ? styles.active : ""}
							>
								10 per page
							</button>
							<button
								onClick={() => handleItemsPerPageChange(20)}
								className={itemsPerPage === 20 ? styles.active : ""}
							>
								20 per page
							</button>
							<button
								onClick={() => handleItemsPerPageChange(50)}
								className={itemsPerPage === 50 ? styles.active : ""}
							>
								50 per page
							</button>
						</div>
					)}
				</div>
			</div>
			<div className={styles.tableWrapper}>
				<div className={styles.tableHeader}>
					<span
						onClick={() => handleColumnClick("country")}
						className={`${styles.sortableHeader} ${styles.stickyColumn}`}
					>
						Country {getSortIcon("country")}
					</span>
					<span
						onClick={() => handleColumnClick("cases")}
						className={styles.sortableHeader}
					>
						Cases {getSortIcon("cases")}
					</span>
					<span
						onClick={() => handleColumnClick("deaths")}
						className={styles.sortableHeader}
					>
						Deaths {getSortIcon("deaths")}
					</span>
					<span
						onClick={() => handleColumnClick("tests")}
						className={styles.sortableHeader}
					>
						Tests {getSortIcon("tests")}
					</span>
					<span
						onClick={() => handleColumnClick("casesPerOneMillion")}
						className={styles.sortableHeader}
					>
						Cases/1M {getSortIcon("casesPerOneMillion")}
					</span>
					<span
						onClick={() => handleColumnClick("deathsPerOneMillion")}
						className={styles.sortableHeader}
					>
						Deaths/1M {getSortIcon("deathsPerOneMillion")}
					</span>
					<span
						onClick={() => handleColumnClick("testsPerOneMillion")}
						className={styles.sortableHeader}
					>
						Tests/1M {getSortIcon("testsPerOneMillion")}
					</span>
				</div>
				<div className={styles.countriesGrid}>
					{displayData.map((country) => (
						<div key={country.country} className={styles.countryRow}>
							<span className={`${styles.countryName} ${styles.stickyColumn}`}>
								{country.country}
							</span>
							<span className={styles.statValue}>
								{numeral(country.cases).format("0,0")}
							</span>
							<span className={styles.statValue}>
								{numeral(country.deaths).format("0,0")}
							</span>
							<span className={styles.statValue}>
								{country.tests ? numeral(country.tests).format("0,0") : "N/A"}
							</span>
							<span className={styles.statValue}>
								{country.casesPerOneMillion
									? numeral(country.casesPerOneMillion).format("0,0")
									: "N/A"}
							</span>
							<span className={styles.statValue}>
								{country.deathsPerOneMillion
									? numeral(country.deathsPerOneMillion).format("0,0")
									: "N/A"}
							</span>
							<span className={styles.statValue}>
								{country.testsPerOneMillion
									? numeral(country.testsPerOneMillion).format("0,0")
									: "N/A"}
							</span>
						</div>
					))}
				</div>
			</div>
			<div className={styles.pagination}>
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className={styles.paginationBtn}
					aria-label="Previous page"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
					</svg>
				</button>
				<span className={styles.paginationInfo}>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className={styles.paginationBtn}
					aria-label="Next page"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
					</svg>
				</button>
			</div>
		</section>
	);
};

export default TopCountriesTable;
