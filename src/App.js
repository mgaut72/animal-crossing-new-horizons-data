import Fuse from "fuse.js";
import React, { useState } from 'react';
import CreatureGrid from './CreatureGrid';
import './App.css';
import bugs from "./bugs.js";
import fish from "./fish.js";
import _ from 'lodash';
import SettingsAndFiltersWrapper from './Nav';
import useLocalStorage, { useLocalStorageSet } from './LocalStorage';
import { isCurrentlyActive, endsThisMonth, newThisMonth } from './DateTimeUtils';

const allCreatures = [...bugs, ...fish];

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

function applyAllFilters(searchString, hemisphere, filtersState, museum) {
}

export default function App() {
  const [searchString, setSearchString] = useState("");
  const [hemisphere, setHemisphere] = useLocalStorage("hemi", "north");
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

  const filteredCreatures = () => {
    const baseCreatures = searchString === "" ? allCreatures
      : fuse(allCreatures, searchString);

    return baseCreatures.filter((c) => {
      return (!filtersState.currentlyActive.enabled || isCurrentlyActive(c, hemisphere))
        && (!filtersState.goingAway.enabled || endsThisMonth(c, hemisphere))
        && (!filtersState.newArrival.enabled || newThisMonth(c, hemisphere))
        && (!filtersState.notInMuseum.enabled || !museum.has(c.name))
        && (c.type === "Bug" ? dataSets.bugs.enabled : true)
        && (c.type === "Fish" ? dataSets.fish.enabled : true)
    });
  };

  const search = _.debounce((text) => {setSearchString(text)}, 120);
  const content = (
    <CreatureGrid
      creatures={filteredCreatures()}
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
        onHemisphereChange={setHemisphere}
        filtersState={filtersState}
        setFiltersState={setFiltersState}
        dataSets={dataSets}
        setDataSets={setDataSets}
      />
    </div>
  );
}
