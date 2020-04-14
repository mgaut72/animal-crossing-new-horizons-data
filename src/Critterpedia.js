
import Fuse from "fuse.js";
import React, { useState } from 'react';
import CritterGrid from './Critterpedia/CritterGrid';
import './App.css';
import bugs from "./Critterpedia/bugs.js";
import fish from "./Critterpedia/fish.js";
import _ from 'lodash';
import useLocalStorage, { useLocalStorageSet } from './LocalStorage';
import { isCurrentlyActive, endsThisMonth, newThisMonth } from './Critterpedia/DateTimeUtils';
import BaseAppBar from './BaseAppBar';
import AppBarSearch from './AppBarSearch';
import AppBarSelect from './AppBarSelect';
import AppBarMultiSelect from './AppBarMultiSelect';

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

function sortByNone(arr) { return arr };
function sortByName(arr) { return _.sortBy(arr, 'name') };
function sortByNameReverse(arr) { return _.sortBy(arr, 'name').reverse() };
function sortByPriceHighToLow(arr) { return _.sortBy(arr, 'price').reverse() };

const sortFncs = {
  "": sortByNone,
  "Name": sortByName,
  "Name (reverse)": sortByNameReverse,
  "Price (high to low)": sortByPriceHighToLow,
};

const sortByOptions = Object.keys(sortFncs);

export default function CritterCompanion(props) {
  const { toggleDrawer } = props;

  const [hemisphere, setHemisphere] = useLocalStorage("hemi", "north");
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [museum, setMuseum] = useLocalStorageSet("museum");

  const filterFncs = {
    "Currently Active":  function(c) { return isCurrentlyActive(c, hemisphere) },
    "Leaving This Month": function(c) { return endsThisMonth(c, hemisphere) },
    "New This Month": function(c) { return newThisMonth(c, hemisphere) },
    "Not In Museum":  function(c) { return !museum.has(c.name) }
  }

  const allFilters = Object.keys(filterFncs)
  const allDataSets = ["Bugs", "Fish"]

  const [enabledFilters, setEnabledFilters] = useState([])
  const [enabledDataSets, setEnabledDataSets] = useState(allDataSets)


  const baseCritters = searchString === "" ? allCritters
    : fuse(allCritters, searchString);


  const filteredCritters = baseCritters.filter((c) => {
    for (const filter of enabledFilters) {
      if (!filterFncs[filter](c)) {
        return false;
      }
    }
    if(!enabledDataSets.includes("Bugs") && c.type === "Bug") {
      return false;
    } else if (!enabledDataSets.includes("Fish") && c.type === "Fish") {
      return false;
    }
    return true;
  });

  const sortedCritters = sortFncs[sortBy](filteredCritters);

  const search = _.debounce((text) => {setSearchString(text)}, 120);

  const moreAppBar = (
    <>
    <AppBarMultiSelect
      label="Critters"
      value={enabledDataSets}
      onValueChange={setEnabledDataSets}
      options={allDataSets}
    />
    <AppBarMultiSelect
      label="Filter"
      value={enabledFilters}
      onValueChange={setEnabledFilters}
      options={allFilters}
    />
    <AppBarSelect
      label="Sort By"
      value={sortBy}
      onValueChange={setSortBy}
      options={sortByOptions.map(o => o ? [o, o] : [o, <em>None</em>])}
    />
    <AppBarSelect
      label="Hemisphere"
      value={hemisphere}
      onValueChange={setHemisphere}
      options={[['north', 'North'], ['south', 'South']]}
    />
    <AppBarSearch onSearchChange={search} />
    </>
  )

  return (
    <>
    <BaseAppBar
      title="Critterpedia"
      toggleDrawer={toggleDrawer}
      more={moreAppBar}
    />
    <CritterGrid
      critters={sortedCritters}
      hemisphere={hemisphere}
      museum={museum}
      setMuseum={setMuseum}
    />
    </>
  );
}
