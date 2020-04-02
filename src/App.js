import Fuse from "fuse.js";
import React, { useState } from 'react';
import CreatureGrid from './CreatureGrid';
import './App.css';
import bugs from "./bugs.js";
import fish from "./fish.js";
import _ from 'lodash';
import SettingsAndFiltersWrapper from './Nav';

const allCreatures = [...bugs, ...fish];

function fuse(searchList, searchVal) {
  var opts = {
    shouldSort: true,
    keys: ["name"],
    minMatchCharLength: 2,
  };
  var fuse = new Fuse(searchList, opts);
  var res = fuse.search(searchVal);
  return res.map(x => x.item);
}

function filterAllCreatures(searchString) {
  console.log(`search string: ${searchString}`)
  return searchString === ""
    ? allCreatures
    : fuse(allCreatures, searchString);
}

export default function App() {
  const [searchString, setSearchString] = useState("");

  const search = _.debounce((text) => {setSearchString(text)}, 120);
  //<Header onSearchChange={search}/>

  const content = (<CreatureGrid creatures={filterAllCreatures(searchString)}/>);
  return (
    <div>
      <SettingsAndFiltersWrapper
        content={content}
        onSearchChange={search}
      />
    </div>
  );
}
