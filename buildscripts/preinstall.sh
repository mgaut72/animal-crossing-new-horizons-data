cat data/bugs.jsonl | (echo 'export default ' && scripts/to-json-array) > src/bugs.js
cat data/fish.jsonl | (echo 'export default ' && scripts/to-json-array) > src/fish.js;
cat data/seacreatures.jsonl | (echo 'export default ' && scripts/to-json-array) > src/seacreatures.js;

(
for FNAME in src/critterIcons/*; do
    echo import $(echo $FNAME | cut -d/ -f 3 | cut -d. -f 1) from \'./$(echo $FNAME | cut -d/ -f 2,3)\';
done;
echo;
echo 'const icons = {';
for FNAME in src/critterIcons/*; do
    CNAME=$(echo $FNAME | cut -d/ -f 3 | cut -d. -f 1)
    echo "    $CNAME: $CNAME,";
done;
echo "}";
echo;
echo "export default function getIconForCritterName(name) {";
echo "    const icon = icons[name.toLowerCase().replace(/[^a-z]/gi, '')];";
echo "    return icon ? icon : unknown;";
echo "}"
) > src/CritterIcons.js
