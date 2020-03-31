# Animal Crossing New Horizons Data

JSON Lines formatted data on things you can catch, capture, and acquire in New Horizons

## Data

### Fish and Bugs

`fish.jsonl` and `bugs.jsonl` is a json lines file of objects.  Objects on each line in the file have the following fields:
* `name` - String
* `location` - String
* `price` - int.  sell price in bells
* `times` - either `"All"` or a non-empty array of objects with fields `start` and `end`, where the values are ints which correspond to the 0-23 hour of the day.
* `months` - either `"All"` or an object with fields named `north` and `south`.  each of those fields has a value which is an array of object with fields `start` and `end` where the values are 1-12 index of the month in the year.

## `jq` Recipes

Check out the [`jq` utility](https://stedolan.github.io/jq/) to process json on the commadn line.

See [jq-recipes](./jq-recipes/) for interesting / useful `jq` commands on this data.

Most of these scripts are composable, with the exception of 
the `my-hemisphere` script, which simplifies the `months` field so that the value just contains `start` and `end` for your hemispehere (default: north)


