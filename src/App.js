import Fuse from "fuse.js";
import React, { useState } from 'react';
import CreatureGrid from './CreatureGrid';
import './App.css';
import bugs from "./bugs.js";
import fish from "./fish.js";
import _ from 'lodash';
import SettingsAndFiltersWrapper from './Nav';
import useLocalStorage from './LocalStorage';
import { isCurrentlyActive } from './DateTimeUtils';

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

function applyAllFilters(searchString, hemisphere, filtersState) {
  const baseCreatures = searchString === ""
    ? allCreatures
    : fuse(allCreatures, searchString);

  return baseCreatures.filter((c) => {
    return !filtersState.currentlyActive.enabled || isCurrentlyActive(c, hemisphere)
  });
}

export default function App() {
  const [searchString, setSearchString] = useState("");
  const [hemisphere, setHemisphere] = useLocalStorage("hemi", "north");
  const [filtersState, setFiltersState] = useState({
    currentlyActive: {enabled: false, label: "Currently Active Only"},
  });

  const search = _.debounce((text) => {setSearchString(text)}, 120);
  const content = (
    <CreatureGrid
      creatures={applyAllFilters(searchString, hemisphere, filtersState)}
      hemisphere={hemisphere}
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
      />
    </div>
  );
}
