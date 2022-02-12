# Big O
## O(1): Operations && indexing
- assignments
- arithmetic
- comparisons
- object insertion/removal/access/hasOwnProperty
- array push/pop

## O(log *n*)
- ???

## O(*n*): Looping, searching
- loops
- array shift/unshift/concat
- array (slice size of copy)
- array (splice depends on where in the array. beginning is O(n), end is O(1))
- array methods forEach/map/filter/reduce
- object.keys | object.values | object.entries

## O(*n* log *n*): Sorting
- array sort

## O(*n*<sup>2</sup>): Two level loops
- loops inside of loops


# Problem Solving Approach
## STEP 1 Understand the problem
- say the problem in your own words

## STEP 2 Make concrete examples
- inputs (overloading? ranges? types? invalid inputs? casting?)
- outputs (types? what to return on an invalid input?)
- edge cases

## STEP 3 Break it down
- write pseudocode for each step

## STEP 4 Solve simplify the problem into smaller steps
- start solving the pseudocode you can

## STEP 5 Look back and refactor
- Check result accuracy.
- How can you improve the performance? Is there a way to avoid loops or costly computations?
- Can you understand it at a glance? How intuitive is it?
- Does it follow style guidelines?
- Can you use the result for another problem?
- Can you derive it differently? How have other people solved this problem?

# Problem Solving Patterns
## Frequency Counter: O(*n*)
This is helpful whenever you need to check if two things have the same (or mapped) elements
First exit if they don't have the same length.
Make a counter object by looping over the first object
Loop over the second object and if that element doesn't exist in the count, return false
If it does, subtract it
Because they have the same length, there's no need to check that every value is 0. any problems will have been caught in the second loop

## Multiple Pointers
Creating pointers or values that respond to an index and moving based on a condition


## Sliding Window
subset of continuous data

## Divide and Conquer
## Dynamic Programming
## Greedy Algorithms
## Backtracking
