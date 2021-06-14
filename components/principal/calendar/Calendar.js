import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, FlatList } from "react-native";
import { uri, monthNames, monthColors } from "../../../constants";
import { authContext, principalContext } from "../../../contexts";
import style from "./calendar-style";
import CalendarItem from "./CalendarItem";

export default function Calendar() {
  const [calendarData, setCalendarData] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [selectEvent, setSelectEvent] = useState("");
  const setAuth = useContext(authContext);
  const {
    setShowCard,
    showCard,
    monthRef,
    updateCalendar,
    setUpdateCalendar,
    setEdit,
    searchFilters,
    calendarKeys,
    setCalendarKeys
  } = useContext(principalContext);
  const [searchResults, setSearchResults] = useState({});
  const [showSearch, setShowSearch] = useState(false);

  const fetchData = () => {
    fetch(`${uri}/api/events`, {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth === false) {
          setAuth(data.auth);
        } else {
          setCalendarData(data);
          setLoadingData(false);
        }
        //console.log("calendar fetch");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (updateCalendar) {
      fetchData();
      setUpdateCalendar(false);
    }
  }, [updateCalendar]);

  const selectEdit = (eventId, event) => {
    setSelectEvent(eventId);
    setShowCard("edit");
    setEdit(event);
    //console.log(event);
  };
  useEffect(() => {
    if (showCard !== "edit") {
      setSelectEvent("");
    }
  }, [showCard, setSelectEvent]);

  //search
  useEffect(() => {
    let filterData = {};
    let fromMonth;
    let fromDay;
    let toMonth;
    let toDay;

    if (searchFilters.from) {
      const from = searchFilters.from.split("/");
      fromMonth = parseInt(from[0]);
      fromDay = parseInt(from[1]);
    } else {
      fromMonth = 0;
      fromDay = 0;
    }
    if (searchFilters.to) {
      const to = searchFilters.to.split("/");
      toMonth = parseInt(to[0]);
      toDay = parseInt(to[1]);
    } else {
      toMonth = 99;
      toDay = 99;
    }

    let i = 0;
    let lastMonth;
    for (const month in calendarData) {
      if (month >= fromMonth && month <= toMonth) {
        i++;
        lastMonth = month;

        if (i === 1) {
          filterData[month] = {};
          for (const day in calendarData[month]) {
            if (day >= fromDay) {
              filterData[month][day] = [...calendarData[month][day]];
            }
          }
        } else {
          filterData[month] = { ...calendarData[month] };
        }
      }
    }

    for (const day in filterData[lastMonth]) {
      if (day > toDay) {
        delete filterData[lastMonth][day];
      }
    }

    if (searchFilters.name) {
      for (const month in filterData) {
        for (const day in filterData[month]) {
          //console.log( filterData);
          const nameFilter = filterData[month][day].filter((data) => {
            let regExp = new RegExp(searchFilters.name.toLowerCase(), "ig");
            return regExp.test(data.personName);
          });
          if (nameFilter.length === 0) {
            delete filterData[month][day];
          } else {
            filterData[month][day] = nameFilter;
          }
        }

        if (Object.keys(filterData[month]).length === 0) {
          delete filterData[month];
        }
      }
    }

    if (searchFilters.type !== "any" && searchFilters.type) {
      for (const month in filterData) {
        for (const day in filterData[month]) {
          const typeFilter = filterData[month][day].filter((data) => {
            if (data.type === searchFilters.type) {
              return true;
            } else {
              return false;
            }
          });
          if (typeFilter.length === 0) {
            delete filterData[month][day];
          } else {
            filterData[month][day] = typeFilter;
          }
        }

        if (Object.keys(filterData[month]).length === 0) {
          delete filterData[month];
        }
      }
    }
    setSearchResults(filterData);
    setShowSearch(Object.keys(filterData).length > 0 ? true : false);
    setCalendarKeys(Object.keys(filterData).length > 0 ? Object.keys(filterData) : Object.keys(calendarData));
    
  }, [searchFilters, calendarData]);

  const renderItem = ({ item, index }) => (
    <CalendarItem
      month={monthNames[item - 1]}
      color={monthColors[item - 1]}
      monthData={showSearch ? searchResults[item] : calendarData[item]}
      index={index}
      length={calendarKeys.length}
      selectEvent={selectEvent}
      selectEdit={selectEdit}
    />
  );

  return (
    <View>
      {calendarKeys.length > 0 && !loadingData ? (
        <View>
          <FlatList
            ref={monthRef}
            data={calendarKeys}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      ) : loadingData ? (
        <View style={style.spinnerContainer}>
          <ActivityIndicator size="large" color="#6700b7" />
        </View>
      ) : (
        <View style={style.emptyContainer}>
          <Text style={style.emptyText}>You don't have any event</Text>
          <Text style={[style.emptyText, { marginBottom: 20 }]}>
            add one pressing{" "}
          </Text>
          <Image source={require("../../../assets/img/add.png")} />
        </View>
      )}
    </View>
  );
}
