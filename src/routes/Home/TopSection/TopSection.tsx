import { ConfigProvider, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle responsive font sizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ant Design theme configuration
  const selectTheme = {
    components: {
      Select: {
        colorBgContainer: "#060b29",
        colorBorder: "#2a45b1",
        colorBorderHover: "#2a45b1",
        colorPrimary: "#2a45b1",
        colorPrimaryHover: "#2a45b1",
        colorText: "#99aae7",
        colorTextPlaceholder: "rgba(153, 170, 231, 0.7)",
        controlItemBgHover: "rgba(42, 69, 177, 0.2)",
        controlItemBgActive: "rgba(42, 69, 177, 0.4)",
        boxShadowSecondary: "0px 0px 1px 1px #2a45b1",
        fontSize: windowWidth >= 600 ? 16 : 14,
        fontWeightStrong: 500,
        optionSelectedBg: "rgba(42, 69, 177, 0.4)",
        optionActiveBg: "rgba(42, 69, 177, 0.2)",
        colorBgElevated: "#060b29",
        borderRadius: 6,
        controlHeight: 40,
        colorTextDisabled: "rgba(153, 170, 231, 0.5)",
        colorIcon: "#99aae7",
        colorIconHover: "#99aae7",
      },
    },
    token: {
      colorBgContainer: "#060b29",
      colorBorder: "#2a45b1",
      colorText: "#99aae7",
      colorTextPlaceholder: "rgba(153, 170, 231, 0.7)",
      colorPrimary: "#2a45b1",
      boxShadowSecondary: "0px 0px 5px 1px #2a45b1",
      fontSize: windowWidth >= 600 ? 16 : 14,
      borderRadius: 6,
    },
  };

  const handleChange = (value: string, option: any) => {
    setSelected({
      label: option.label,
      value: value,
    });
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
    dispatch(fetchCountries());
  }, []);

  /**
   * On Country selection runs fetch for historical data for selected country
   */
  useEffect(() => {
    dispatch(
      fetchCountryHistoricalData({
        countryCode: selected.label,
        days: 365 * 4,
      }),
    );
  }, [selected.label]);

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
      <div className={styles.inputContainer}>
        <ConfigProvider theme={selectTheme}>
          <Select
            options={options}
            value={selected.value}
            onChange={handleChange}
            className={styles.select}
            style={{ width: "100%" }}
            showSearch
            loading={loading === "pending" || loading === "idle"}
            placeholder="Select a country"
            optionFilterProp="label"
            dropdownStyle={{
              backgroundColor: "#060b29",
              border: "1px solid #2a45b1",
              boxShadow: "0px 0px 5px 1px #2a45b1",
            }}
          />
        </ConfigProvider>
      </div>
      <span className={styles.date}></span>
    </form>
  );
};

const MemoizedTopSection = React.memo(TopSection);

export default MemoizedTopSection;
