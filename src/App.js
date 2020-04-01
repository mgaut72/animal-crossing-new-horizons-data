import Fuse from "fuse.js";
import React, { useState } from 'react';
import CreatureGrid from './CreatureGrid';
import Header from './Header';
import './App.css';
import bugs from "./bugs.js";
import fish from "./fish.js";
import _ from 'lodash';

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

  return (
    <div>
      <Header onSearchChange={search}/>
      <CreatureGrid creatures={filterAllCreatures(searchString)}/>
    </div>
  );
}
