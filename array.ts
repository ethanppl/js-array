export const MyArray = {
  at: <T>(array: Array<T>, index: number): T | undefined => {
    // To handle if the index is negative, look from the back
    if (index < 0) {
      index = array.length + index;
    }

    // Out of range, return undefined
    if (index < 0 || index >= array.length) {
      return undefined;
    }

    return array[index];
  },
  concat: <T1, T2>(array1: Array<T1>, array2: Array<T2>): Array<T1 | T2> => {
    let output = Array.from<T1 | T2>(array1);

    let i = 0;
    while (i < array2.length) {
      output[output.length] = array2[i++];
    }

    return output;
  },
  copyWithin: <T>(
    array: Array<T>,
    target: number,
    start: number,
    end?: number
  ): Array<T> => {
    if (target < -array.length) {
      target = 0;
    } else if (target < 0) {
      target = target + array.length;
    } else if (target >= array.length) {
      return array;
    }

    if (start < -array.length) {
      start = 0;
    } else if (start < 0) {
      start = start + array.length;
    } else if (start >= array.length) {
      return array;
    }

    if (end !== undefined && end < -array.length) {
      end = 0;
    } else if (end !== undefined && end < 0) {
      end = end + array.length;
    } else if (end === undefined || end >= array.length) {
      end = array.length;
    }

    if (end <= start) {
      return array;
    }

    if (target <= start) {
      // Copy from left to right
      let i = 0;
      while (i < end - start) {
        array[target + i] = array[start + i++];
      }
    } else {
      // Copy from right to left
      const distanceToCopy = Math.min(end - start, array.length - target);
      let i = distanceToCopy - 1;
      while (i >= 0) {
        array[target + i] = array[start + i--];
      }
    }

    return array;
  },
  entries: function* entries<T>(array: Array<T>): ArrayIterator<[number, T]> {
    let i = 0;
    while (i < array.length) {
      yield [i, array[i++]];
    }
  },
  every: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ) => {
    let i = 0;
    let every = true;

    // loop the array
    while (i < array.length) {
      // Skip empty element
      if (i in array) {
        const result = callback.call(thisArg, array[i], i, array);

        if (!result) {
          // If one is false, stop looping
          every = false;
          break;
        }
      }
      i++;
    }

    return every;
  },
  fill: <T>(
    array: Array<T>,
    value: any,
    start?: number,
    end?: number
  ): Array<any> => {
    if (start === undefined || start < -array.length) {
      start = 0;
    } else if (start < 0) {
      start = array.length + start;
    } else if (start >= array.length) {
      return array;
    }

    if (end === undefined || end >= array.length) {
      end = array.length;
    } else if (end < -array.length) {
      end = 0;
    } else if (end < 0) {
      end = array.length + end;
    }

    if (end <= start) {
      return array;
    }

    let i = start;
    while (i < end) {
      array[i++] = value;
    }
    return array;
  },
  filter: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ) => {
    let i = 0;
    let output: Array<T> = [];

    // loop the array
    while (i < array.length) {
      // Skip empty element
      if (i in array) {
        const result = callback.call(thisArg, array[i], i, array);

        if (result) {
          output[output.length] = array[i];
        }
      }
      i++;
    }

    return output;
  },
  find: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ) => {
    let i = 0;

    // loop the array
    // find does not skip empty value, but behave the same as undefined
    while (i < array.length) {
      const result = callback.call(thisArg, array[i], i, array);

      if (result) {
        return array[i];
      }
      i++;
    }

    return undefined;
  },
  findIndex: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ) => {
    let i = 0;

    // loop the array
    // find does not skip empty value, but behave the same as undefined
    while (i < array.length) {
      const result = callback.call(thisArg, array[i], i, array);

      if (result) {
        return i;
      }
      i++;
    }

    return -1;
  },
  findLast: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ) => {
    let i = array.length - 1;

    // loop the array from the end
    // find does not skip empty value, but behave the same as undefined
    while (i >= 0) {
      const result = callback.call(thisArg, array[i], i, array);

      if (result) {
        return array[i];
      }
      i--;
    }

    return undefined;
  },
  findLastIndex: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ) => {
    let i = array.length - 1;

    // loop the array from the end
    // find does not skip empty value, but behave the same as undefined
    while (i >= 0) {
      const result = callback.call(thisArg, array[i], i, array);

      if (result) {
        return i;
      }
      i--;
    }

    return -1;
  },
  flat: <T>(array: Array<T>, depth: number = 1): Array<T> => {
    return doFlat([], array, depth);
  },
  flatMap: <TInput, TOutput>(
    array: Array<TInput>,
    callback: (element: TInput, index: number, array: Array<TInput>) => TOutput,
    thisArg?: any
  ): Array<TOutput> => {
    let output: Array<TOutput> = [];

    // loop the array
    let i = 0;
    while (i < array.length) {
      // Skip empty element
      if (i in array) {
        const result = callback.call(thisArg, array[i], i, array);

        // flat 1 layer in the loop
        if (Array.isArray(result)) {
          let j = 0;
          while (j < result.length) {
            output[output.length] = result[j++];
          }
        } else {
          output[output.length] = result;
        }
      }
      i++;
    }

    return output;
  },
  forEach: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => void,
    thisArg?: any
  ): void => {
    // loop the array
    let i = 0;
    while (i < array.length) {
      // Skip empty element
      if (i in array) {
        callback.call(thisArg, array[i], i, array);
      }
      i++;
    }
  },
  includes: <T>(
    array: Array<T>,
    searchElement: T,
    fromIndex: number = 0
  ): boolean => {
    if (fromIndex < -array.length) {
      fromIndex = 0;
    } else if (fromIndex < 0) {
      fromIndex = fromIndex + array.length;
    } else if (fromIndex > array.length) {
      return false;
    }

    // loop the array
    let i = fromIndex;
    while (i < array.length) {
      // includes use sameValueZero algorithm
      if (sameValueZero(array[i], searchElement)) {
        return true;
      }
      i++;
    }
    return false;
  },
  indexOf: <T>(
    array: Array<T>,
    searchElement: T,
    fromIndex: number = 0
  ): number => {
    if (fromIndex < -array.length) {
      fromIndex = 0;
    } else if (fromIndex < 0) {
      fromIndex = fromIndex + array.length;
    } else if (fromIndex > array.length) {
      return -1;
    }

    // loop the array
    let i = fromIndex;
    while (i < array.length) {
      // indexOf skip empty elements
      if (i in array) {
        // indexOf use strict equal
        if (array[i] === searchElement) {
          return i;
        }
      }
      i++;
    }
    return -1;
  },
  join: <T>(array: Array<T>, separator: string = ","): string => {
    let output = "";
    let i = 0;

    while (i < array.length) {
      // join element
      if (array[i] !== null && array[i] !== undefined) {
        output += array[i];
      }

      i++;

      // join separator
      if (i != array.length) {
        output += separator;
      }
    }

    return output;
  },
  keys: function* keys<T>(array: Array<T>): ArrayIterator<number> {
    let i = 0;
    while (i < array.length) {
      yield i++;
    }
  },
  lastIndexOf: <T>(
    array: Array<T>,
    searchElement: T,
    fromIndex: number = array.length
  ): number => {
    if (fromIndex < -array.length) {
      return -1;
    } else if (fromIndex < 0) {
      fromIndex = fromIndex + array.length;
    } else if (fromIndex > array.length) {
      fromIndex = array.length;
    }

    // loop the array
    let i = fromIndex;
    while (i >= 0) {
      // lastIndexOf skip empty elements
      if (i in array) {
        // lastIndexOf use strict equal
        if (array[i] === searchElement) {
          return i;
        }
      }
      i--;
    }
    return -1;
  },
  map: <TInput, TOutput>(
    array: Array<TInput>,
    callback: (element: TInput, index: number, array: Array<TInput>) => TOutput,
    thisArg?: any
  ): Array<TOutput> => {
    let output: Array<TOutput> = [];

    // loop the array
    let i = 0;
    while (i < array.length) {
      // Skip invoke on empty element, but still create empty element
      if (i in array) {
        output[output.length] = callback.call(thisArg, array[i], i, array);
      } else {
        output.length++;
      }
      i++;
    }

    return output;
  },
  pop: <T>(array: Array<T>): T | undefined => {
    // Cannot pop if the array is empty
    if (array.length === 0) {
      return undefined;
    }

    // The last element being popped
    const output = array[array.length - 1];

    // Reduce the length
    array.length--;

    return output;
  },
  push: <TArray>(array: Array<TArray>, ...elements: Array<TArray>): number => {
    const n = elements.length;

    let i = 0;
    while (i < n) {
      array[array.length] = elements[i++];
    }

    return array.length;
  },
  reduce: <TInput, TOutput>(
    array: Array<TInput>,
    callback: (
      accumulator: TOutput,
      element: TInput,
      index: number,
      array: Array<TInput>
    ) => TOutput,
    initialValue?: any
  ): TOutput => {
    let i = 0;
    let accumulator: TOutput;

    if (initialValue) {
      accumulator = initialValue;
    } else if (array.length !== 0) {
      // If initialValue is not specified and first element exists,
      // accumulator is initialized to the first element,
      // and callback starts with the second element
      accumulator = array[i++] as unknown as TOutput;
    } else {
      // Throw if initialValue is not specified and array is empty,
      throw new TypeError("Reduce of empty array with no initial value");
    }

    // loop the array
    while (i < array.length) {
      // Skip invoke on empty element
      if (i in array) {
        accumulator = callback(accumulator, array[i], i, array);
      }
      i++;
    }

    return accumulator;
  },
  reduceRight: <TInput, TOutput>(
    array: Array<TInput>,
    callback: (
      accumulator: TOutput,
      element: TInput,
      index: number,
      array: Array<TInput>
    ) => TOutput,
    initialValue?: any
  ): TOutput => {
    let i = array.length - 1;
    let accumulator: TOutput;

    if (initialValue) {
      accumulator = initialValue;
    } else if (array.length !== 0) {
      // If initialValue is not specified and first element exists,
      // accumulator is initialized to the first element,
      // and callback starts with the second element
      accumulator = array[i--] as unknown as TOutput;
    } else {
      // Throw if initialValue is not specified and array is empty,
      throw new TypeError("Reduce of empty array with no initial value");
    }

    // loop the array
    while (i >= 0) {
      // Skip invoke on empty element
      if (i in array) {
        accumulator = callback(accumulator, array[i], i, array);
      }
      i--;
    }

    return accumulator;
  },
  reverse: <T>(array: Array<T>): Array<T> => {
    let i = 0;
    let j = array.length - 1;

    while (i < j) {
      swap(array, i, j);

      i++;
      j--;
    }

    return array;
  },
  shift: <T>(array: Array<T>): T | undefined => {
    if (array.length === 0) {
      return undefined;
    }

    let i = 0;
    const output = array[i];

    // copy and move early by one
    while (i < array.length - 1) {
      array[i] = array[i + 1];
      i++;
    }

    // asserted above, array is not empty
    array.length--;

    return output;
  },
  slice: <T>(array: Array<T>, start?: number, end?: number): Array<T> => {
    const output: Array<T> = [];

    if (start === undefined || start < -array.length) {
      start = 0;
    } else if (start < 0) {
      start = start + array.length;
    } else if (start >= array.length) {
      return output;
    }

    if (end === undefined || end >= array.length) {
      end = array.length;
    } else if (end < -array.length) {
      end = 0;
    } else if (end < 0) {
      end = end + array.length;
    }

    if (end <= start) {
      return output;
    }

    let i = start;
    while (i < end) {
      output[output.length] = array[i++];
    }

    return output;
  },
  some: <T>(
    array: Array<T>,
    callback: (element: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ) => {
    let i = 0;
    let some = false;

    // loop the array
    while (i < array.length) {
      // Skip empty element
      if (i in array) {
        const result = callback.call(thisArg, array[i], i, array);

        if (result) {
          // If one is true, stop looping
          some = true;
          break;
        }
      }
      i++;
    }

    return some;
  },
  sort: <T>(array: Array<T>, compareFn?: (a: T, b: T) => number): Array<T> => {
    if (!compareFn) {
      compareFn = (a: T, b: T) => {
        const aStr = `${a}`;
        const bStr = `${b}`;

        return aStr.localeCompare(bStr);
      };
    }
    doSort(array, compareFn, 0, array.length - 1);
    return array;
  },
  splice: <T>(
    array: Array<T>,
    start: number,
    deleteCount?: number,
    ...elements: Array<T>
  ): Array<T> => {
    return doSplice(array, start, deleteCount, ...elements);
  },
  toLocaleString: (
    array: Array<any>,
    locales?: string | string[],
    options?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions
  ) => {
    const toString = (e: any) => {
      if (e === null || e === undefined) {
        return "";
      }
      return e.toLocaleString(locales, options);
    };

    let output = toString(array[0]);
    let i = 1;

    while (i < array.length) {
      output += "," + toString(array[i]);
      i++;
    }

    return output;
  },
  toReversed: <T>(array: Array<T>): Array<T> => {
    let output: Array<T> = [];
    let i = 0;

    while (i < array.length) {
      output[i] = array[array.length - i - 1];
      i++;
    }

    return output;
  },
  toSorted: <T>(
    array: Array<T>,
    compareFn?: (a: T, b: T) => number
  ): Array<T> => {
    if (!compareFn) {
      compareFn = (a: T, b: T) => {
        const aStr = `${a}`;
        const bStr = `${b}`;

        return aStr.localeCompare(bStr);
      };
    }

    // Copy the array, and implicitly convert empty to undefined
    const output: Array<T> = [];
    let i = 0;
    while (i < array.length) {
      output[i] = array[i];
      i++;
    }

    doSort(output, compareFn, 0, output.length - 1);
    return output;
  },
  toSpliced: <T>(
    array: Array<T>,
    start: number,
    deleteCount?: number,
    ...elements: Array<T>
  ): Array<T> => {
    // Copy the array, and implicitly convert empty to undefined
    const output: Array<T> = [];
    let i = 0;
    while (i < array.length) {
      output[i] = array[i];
      i++;
    }

    doSplice(output, start, deleteCount, ...elements);
    return output;
  },
  toString: (array: Array<any>) => {
    const toString = (e: any) => {
      if (e === null || e === undefined) {
        return "";
      }
      return e.toString();
    };

    let output = toString(array[0]);
    let i = 1;

    while (i < array.length) {
      output += "," + toString(array[i]);
      i++;
    }

    return output;
  },
  unshift: <T>(array: Array<T>, ...elements: Array<T>): number => {
    let n = array.length;
    let i = n - 1;

    while (i >= 0) {
      array[i + elements.length] = array[i];
      i--;
    }

    i = 0;
    while (i < elements.length) {
      array[i] = elements[i];
      i++;
    }

    return array.length;
  },
  values: function* values<T>(array: Array<T>): ArrayIterator<T> {
    let i = 0;
    while (i < array.length) {
      yield array[i++];
    }
  },
  with: <T>(array: Array<T>, index: number, value: T): Array<T> => {
    if (index < 0) {
      index = index + array.length;
    }

    if (index < 0 || index >= array.length) {
      throw new RangeError("Array index out of range");
    }

    const output = Array.from(array);
    output[index] = value;
    return output;
  },
};

const doFlat = (output: Array<any>, elements: Array<any>, depth: number) => {
  let i = 0;
  while (i < elements.length) {
    if (i in elements) {
      if (Array.isArray(elements[i]) && depth > 0) {
        doFlat(output, elements[i], depth - 1);
      } else {
        output[output.length] = elements[i];
      }
    }
    i++;
  }

  return output;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality
const sameValueZero = (x: any, y: any) => {
  if (typeof x === "number" && typeof y === "number") {
    // x and y are equal (may be -0 and 0) or they are both NaN
    return x === y || (x !== x && y !== y);
  }
  return x === y;
};

const doSort = <T>(
  array: Array<T>,
  compareFn: (a: T, b: T) => number,
  startIndex: number,
  endIndex: number
) => {
  const length = endIndex - startIndex + 1;
  if (length <= 1) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * length) + startIndex;
  swap(array, randomIndex, endIndex);

  let currentIndex = startIndex;
  let pivotIndex = startIndex;
  while (currentIndex < endIndex) {
    // pivot is empty, current in front, so swap
    if (!(endIndex in array)) {
      swap(array, currentIndex, pivotIndex);
      pivotIndex++;
      currentIndex++;
      continue;
    }

    // current is empty but pivot is not, do nothing
    if (!(currentIndex in array)) {
      currentIndex++;
      continue;
    }

    // pivot is undefined but current is defined, current in front, so swap
    if (array[endIndex] === undefined) {
      swap(array, currentIndex, pivotIndex);
      pivotIndex++;
      currentIndex++;
      continue;
    }

    // current is undefined but pivot is not
    if (array[currentIndex] === undefined || array[endIndex] === undefined) {
      currentIndex++;
      continue;
    }

    // neither are empty or undefined
    const compare = compareFn(array[currentIndex], array[endIndex]);

    if (compare < 0) {
      swap(array, currentIndex, pivotIndex);
      pivotIndex++;
    }

    currentIndex++;
  }

  swap(array, pivotIndex, endIndex);

  doSort(array, compareFn, startIndex, pivotIndex - 1);
  doSort(array, compareFn, pivotIndex + 1, endIndex);
};

const swap = <T>(array: Array<T>, i: number, j: number) => {
  if (i === j) {
    return;
  }

  const firstTemp = array[i];
  const isFirstInArray = i in array;
  const isSecondInArray = j in array;

  if (isSecondInArray) {
    array[i] = array[j];
  } else {
    delete array[i];
  }

  if (isFirstInArray) {
    array[j] = firstTemp;
  } else {
    delete array[j];
  }

  return array;
};

const doSplice = <T>(
  array: Array<T>,
  start: number,
  deleteCount?: number,
  ...elements: Array<T>
): Array<T> => {
  if (start < -array.length) {
    start = 0;
  } else if (start < 0) {
    start = start + array.length;
  } else if (start >= array.length) {
    start = array.length;
  }

  if (deleteCount === undefined) {
    deleteCount = array.length - start;
  }

  const deleteTill = Math.max(start + deleteCount, start);
  const copyToBeDeleted = [];
  const copyRestOfArray = [];

  let i = start;
  while (i < deleteTill) {
    copyToBeDeleted[copyToBeDeleted.length] = array[i++];
  }

  i = deleteTill;
  while (i < array.length) {
    copyRestOfArray[copyRestOfArray.length] = array[i++];
  }

  i = 0;
  while (i < elements.length) {
    array[start + i] = elements[i];
    i++;
  }

  i = 0;
  while (i < copyRestOfArray.length) {
    array[start + elements.length + i] = copyRestOfArray[i];
    i++;
  }

  array.length = start + elements.length + i;

  return copyToBeDeleted;
};

export default MyArray;
