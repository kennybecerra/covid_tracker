import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import {
  fetchCountries,
  type CountryData,
} from "../../../redux/features/countries";
import { selectCountryData } from "../../../redux/features/country";
import { fetchCountryHistoricalData } from "../../../redux/features/historical";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import BackgroundTop from "./Backgrounds/BackgroundTop";
import styles from "./TopSection.module.scss";

// Helper

const transformData = (data: CountryData[]) => {
  return data.map((item) => {
    return {
      label: item.country,
      value: item.countryInfo.iso2,
    };
  });
};

const TopSection = () => {
  const dispatch = useAppDispatch();

  const { loading, data } = useAppSelector((state) => state.countries);
  const [selected, setSelected] = useState({
    label: "USA",
    value: "US",
  });

  const handleChange: (prop: { label: string; value: string }) => void = (
    prop
  ) => {
    setSelected(prop);
    void dispatch(
      fetchCountryHistoricalData({ countryCode: prop.value, days: 60 })
    );
  };

  const options = useMemo(() => {
    return loading === "succeeded" && data !== null ? transformData(data) : [];
  }, [loading, data]);

  const mapNameToCountryData = useMemo(() => {
    if (loading === "succeeded" && Array.isArray(data)) {
      return data.reduce<Record<string, CountryData>>((accu, curr) => {
        const { countryInfo } = curr;
        if (!accu[countryInfo?.iso2]) {
          accu[countryInfo?.iso2] = curr;
        }

        return accu;
      }, {});
    }

    return null;
  }, [loading, data]);

  /**
   * Runs the initial fetch for all country data
   */
  useEffect(() => {
    void dispatch(fetchCountries());
  }, [dispatch]);

  /**
   * On Country selection runs fetch for historical data for selected country
   */
  useEffect(() => {
    void dispatch(
      fetchCountryHistoricalData({ countryCode: selected.label, days: 365 })
    );
  }, [dispatch, selected?.value, selected.label]);

  /**
   * Saves selected country country data to redux store
   */

  useEffect(() => {
    if (!!mapNameToCountryData && typeof selected?.value === "string") {
      const countryData = mapNameToCountryData[selected.value];

      dispatch(selectCountryData(countryData));
    }
  }, [mapNameToCountryData, selected.label, selected.value]);

  return (
    <form action="" className={styles.search}>
      <BackgroundTop />
      <span className={styles.location}></span>
      <div className={styles.inputContainer} id="selector-container">
        <Select
          id="selector"
          aria-label="dropdown"
          options={options}
          value={selected}
          onChange={handleChange}
          className={styles.select}
          isSearchable
          isLoading={loading === "pending" || loading === "idle"}
        />
      </div>
      <span className={styles.date}></span>
    </form>
  );
};

const MemoizedTopSection = React.memo(TopSection);

export default MemoizedTopSection;
