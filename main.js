
function createHashMap() {

    // Intialize Variables 
    let capacity = 16; // Initial Array Size
    let loadFactor = 0.75; // Resize when 75% full
    let size = 0; // Number of key-value pairs
    let buckets = new Array(capacity).fill(null).map(() => []); // Array of arrays for chaining

    // hashing function
    function hash(key) {
        let hashCode = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % capacity;
        }
        return hashCode;
    }

    // Resize hash map when load factor is exceeded 
    function resize() {
        const oldBuckets = buckets;
        capacity *= 2; // doubling the capacity 
        size = 0;
        buckets = new Array(capacity).fill(null).map(() => []);

        // Rehash all existing key-value pairs
        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                set(key, value);
            }
        }
    }

    // Set a key-value pair 
    function set(key, value) {
        if (size / capacity >= loadFactor) {
            resize();
        }

        const index = hash(String(key));
        const bucket = buckets[index];

        // Check if key exists
        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value; // Update value
                return;
            }
        }

        // Add new kay-value pair 
        bucket.push([key, value]);
        size++;
    }

    // Get value by key 
    function get(key) {
        const index = hash(String(key));
        const bucket = buckets[index];

        for (const pair of bucket) {
            if (pair[0] === key) {
              return pair[1];
            }
        }
        return undefined; // Key not found
    }

    // Get entries
    function entries() {
        const entryArray = [];
        for (const bucket of buckets) {
            for (const [key, value] of bucket) {
                entryArray.push([key, value]);
            }
        }
        return entryArray;
    }

    // Remove key-value pair 
    function remove(key) {
        const index = hash(String(key));
        const bucket = buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                size--;
                return true;
            }
        }
        return true;
    }

    //  Clear all entries
    function clear() {
        buckets = new Array(capacity).fill(null).map(() => []);
        size = 0;
    }

    // Get all Keys 
    function keys() {
        const keyArray = [];
        for (const bucket of buckets) {
            for (const [key] of bucket) {
                keyArray.push(key);
            }
        }
        return keyArray;
    }

    // Get all values 
    function values() {
        const valueArray = [];
        for (const bucket of buckets) {
            for (const [, value] of bucket) {
                valueArray.push(value);
            }
        }
        return valueArray;
    }

    // Get all key-value pairs


    // Get Current Size 
    function getSize() {
        return size;
    }

    // Get Current capacity 
    function getCapacity() {
        return capacity;
    }

    // Get Current Load Factor 
    function getLoadFactor() {
        return loadFactor;
    }

    //
    return {
        set,
        get,
        remove,
        getSize,
        keys,
        values,
        entries,
        clear,
        getCapacity,
        getLoadFactor
    };
}



// Create a new hash map
const myMap = createHashMap();

// Test 1: Adding and retrieving key-value pairs
console.log("Test 1: Adding and retrieving");
myMap.set("name", "John");
myMap.set("age", 30);
myMap.set("city", "New York");

console.log(myMap.get("name") === "John" ? "Pass: get name" : "Fail"); // Pass
console.log(myMap.get("age") === 30 ? "Pass: get age" : "Fail"); // Pass
console.log(myMap.get("email") === undefined ? "Pass: get non-existent" : "Fail"); // Pass

// Test 2: Updating existing key
console.log("\nTest 2: Updating");
myMap.set("name", "Jane");
console.log(myMap.get("name") === "Jane" ? "Pass: update name" : "Fail"); // Pass
console.log(myMap.getSize() === 3 ? "Pass: size after update" : "Fail"); // Pass

// Test 3: Removing key-value pairs
console.log("\nTest 3: Removing");
console.log(myMap.remove("age") === true ? "Pass: remove age" : "Fail"); // Pass
console.log(myMap.get("age") === undefined ? "Pass: age gone" : "Fail"); // Pass
console.log(myMap.remove("email") === false ? "Pass: remove non-existent" : "Fail"); // Pass
console.log(myMap.getSize() === 2 ? "Pass: size after remove" : "Fail"); // Pass

// Test 4: Listing keys, values, and entries
console.log("\nTest 4: Listing");
console.log(JSON.stringify(myMap.keys()) === JSON.stringify(["name", "city"]) ? "Pass: keys" : "Fail"); // Pass
console.log(JSON.stringify(myMap.values()) === JSON.stringify(["Jane", "New York"]) ? "Pass: values" : "Fail"); // Pass
console.log(JSON.stringify(myMap.entries()) === JSON.stringify([["name", "Jane"], ["city", "New York"]]) ? "Pass: entries" : "Fail"); // Pass

// Test 5: Clearing the hash map
console.log("\nTest 5: Clearing");
myMap.clear();
console.log(myMap.getSize() === 0 ? "Pass: size after clear" : "Fail"); // Pass
console.log(myMap.get("name") === undefined ? "Pass: name gone" : "Fail"); // Pass
console.log(myMap.getCapacity() === 16 ? "Pass: capacity unchanged" : "Fail"); // Pass

// Test 6: Resizing (add many items to trigger load factor)
console.log("\nTest 6: Resizing");
for (let i = 0; i < 13; i++) {
  myMap.set(`key${i}`, `value${i}`);
}
console.log(myMap.getSize() === 13 ? "Pass: size after adding" : "Fail"); // Pass
console.log(myMap.getCapacity() > 16 ? "Pass: capacity increased" : "Fail"); // Pass
console.log(myMap.get("key0") === "value0" ? "Pass: key0 still accessible" : "Fail"); // Pass

// Test 7: Edge cases
console.log("\nTest 7: Edge cases");
myMap.clear();
myMap.set(123, "numberKey"); // Non-string key
myMap.set("", "emptyKey"); // Empty string key
myMap.set("longKey".repeat(1000), "longValue"); // Very long key
console.log(myMap.get(123) === "numberKey" ? "Pass: number key" : "Fail"); // Pass
console.log(myMap.get("") === "emptyKey" ? "Pass: empty key" : "Fail"); // Pass
console.log(myMap.get("longKey".repeat(1000)) === "longValue" ? "Pass: long key" : "Fail"); // Pass


