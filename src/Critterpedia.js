
import Fuse from "fuse.js";
import React, { useState } from 'react';
import CritterGrid from './CritterGrid';
import './App.css';
import bugs from "./bugs.js";
import fish from "./fish.js";
import _ from 'lodash';
import SettingsAndFiltersWrapper from './Nav';
import useLocalStorage, { useLocalStorageSet } from './LocalStorage';
import { isCurrentlyActive, endsThisMonth, newThisMonth } from './DateTimeUtils';

const allCritters = [...bugs, ...fish];

function fuse(searchList, searchVal) {
  var opts = {
    shouldSort: true,
    keys: ["name"],
    minMatchCharLength: 2,
    threshold: 0.4,
  };
  var fuse = new Fuse(searchList, opts);
  var res = fuse.search(searchVal);
  return res.map(x => x.item);
}

function sortByName(arr) { return _.sortBy(arr, 'name') };
function sortByNameReverse(arr) { return _.sortBy(arr, 'name').reverse() };
function sortByPriceHighToLow(arr) { return _.sortBy(arr, 'price').reverse() };

const sortFncs = {
  "Name": sortByName,
  "Name (reverse)": sortByNameReverse,
  "Price (high to low)": sortByPriceHighToLow,
};

const sortByOptions = Object.keys(sortFncs);

export default function CritterCompanion() {
  const [searchString, setSearchString] = useState("");
  const [hemisphere, setHemisphere] = useLocalStorage("hemi", "north");
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [museum, setMuseum] = useLocalStorageSet("museum");
  const [filtersState, setFiltersState] = useState({
    currentlyActive: {enabled: false, label: "Currently Active"},
    goingAway: {enabled: false, label: "Leaving This Month"},
    newArrival: {enabled: false, label: "New This Month"},
    notInMuseum: {enabled: false, label: "Not In Museum"},
  });
  const [dataSets, setDataSets] = useState({
    bugs: {enabled: true, label: "Bugs"},
    fish: {enabled: true, label: "Fish"},
  });


  const baseCritters = searchString === "" ? allCritters
    : fuse(allCritters, searchString);

  const filteredCritters = baseCritters.filter((c) => {
      return (!filtersState.currentlyActive.enabled || isCurrentlyActive(c, hemisphere))
        && (!filtersState.goingAway.enabled || endsThisMonth(c, hemisphere))
        && (!filtersState.newArrival.enabled || newThisMonth(c, hemisphere))
        && (!filtersState.notInMuseum.enabled || !museum.has(c.name))
        && (c.type === "Bug" ? dataSets.bugs.enabled : true)
        && (c.type === "Fish" ? dataSets.fish.enabled : true)
  });

  const sortedCritters = sortFncs[sortBy](filteredCritters);

  const search = _.debounce((text) => {setSearchString(text)}, 120);
  const content = (
    <CritterGrid
      critters={sortedCritters}
      hemisphere={hemisphere}
      museum={museum}
      setMuseum={setMuseum}
    />
  );

  return (
    <div>
      <SettingsAndFiltersWrapper
        content={content}
        onSearchChange={search}
        hemisphere={hemisphere}
        setHemisphere={setHemisphere}
        filtersState={filtersState}
        setFiltersState={setFiltersState}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortByOptions={sortByOptions}
        dataSets={dataSets}
        setDataSets={setDataSets}
      />
    </div>
  );
}
