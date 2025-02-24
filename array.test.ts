import { expect, test, describe } from "bun:test";
import MyArray from "./array";

describe("at", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [1, [2, 3, 4], 5],
  ];
  const indexes = [-100, -2, -1, 0, 1, 100];

  for (const array of arrays) {
    for (const index of indexes) {
      test(`array: ${array}, index: ${index}`, () => {
        expect(MyArray.at(array, index)).toBe(array.at(index));
      });
    }
  }
});

describe("concat", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [1, [2, 3, 4], 5],
  ];

  for (const array1 of arrays) {
    for (const array2 of arrays) {
      test(`array1: ${array1}, array2: ${array2}`, () => {
        expect(MyArray.concat(array1, array2)).toEqual(array1.concat(array2));
      });
    }
  }
});

describe("copyWithin", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [1, [2, 3, 4], 5],
  ];
  const indexes = [-100, -1, 0, 3, 100];

  for (const array of arrays) {
    for (const target of indexes) {
      for (const start of indexes) {
        test(`array: ${array}, target: ${target}, start: ${start}`, () => {
          const actualArray = Array.from(array);
          const expectedArray = Array.from(array);

          expect(MyArray.copyWithin(actualArray, target, start)).toEqual(
            expectedArray.copyWithin(target, start)
          );
          expect(actualArray).toEqual(expectedArray);
        });
      }
    }
  }

  for (const array of arrays) {
    for (const target of indexes) {
      for (const start of indexes) {
        for (const end of indexes) {
          test(`array: ${array}, target: ${target}, start: ${start}, end: ${end}`, () => {
            const actualArray = Array.from(array);
            const expectedArray = Array.from(array);

            expect(MyArray.copyWithin(actualArray, target, start, end)).toEqual(
              expectedArray.copyWithin(target, start, end)
            );
            expect(actualArray).toEqual(expectedArray);
          });
        }
      }
    }
  }
});

describe("entries", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actualIterator = MyArray.entries(array);
      const expectedIterator = array.entries();

      let actual = actualIterator.next();
      let expected = expectedIterator.next();
      expect<boolean | undefined>(actual.done).toBe(expected.done);

      while (!expected.done) {
        expect(actual.value).toEqual(expected.value);

        actual = actualIterator.next();
        expected = expectedIterator.next();
        expect<boolean | undefined>(actual.done).toBe(expected.done);
      }
    });
  }
});

describe("every", () => {
  const arrays: Array<Array<any>> = [
    [],
    [100, 200, 300, 400],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [1, 2, 3, 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} length > 0`, () => {
      const fun = (element: any) => {
        return element.length > 0;
      };

      const actual = MyArray.every(array, fun);
      const expected = array.every(fun);
      expect(actual).toBe(expected);
    });

    test(`array: ${array} truthy`, () => {
      const fun = (element: any) => {
        return !!element;
      };

      const actual = MyArray.every(array, fun);
      const expected = array.every(fun);
      expect(actual).toBe(expected);
    });

    test(`array: ${array} ascending`, () => {
      const fun = (element: any, index: number, arr: Array<any>) => {
        if (index === 0) {
          return true;
        } else {
          return element > arr[index - 1];
        }
      };

      const actual = MyArray.every(array, fun);
      const expected = array.every(fun);
      expect(actual).toBe(expected);
    });
  }
});

describe("fill", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [1, [2, 3, 4], 5],
  ];
  const values = [0, null, "one"];
  const indexes = [-100, -1, 0, 3, 100];

  for (const array of arrays) {
    for (const value of values) {
      test(`array: ${array}, value: ${value}`, () => {
        const actualArray = Array.from(array);
        const expectedArray = Array.from(array);

        expect(MyArray.fill(actualArray, value)).toEqual(
          expectedArray.fill(value)
        );
        expect(actualArray).toEqual(expectedArray);
      });
    }
  }

  for (const array of arrays) {
    for (const value of values) {
      for (const start of indexes) {
        test(`array: ${array}, value: ${value}, start: ${start}`, () => {
          const actualArray = Array.from(array);
          const expectedArray = Array.from(array);

          expect(MyArray.fill(actualArray, value, start)).toEqual(
            expectedArray.fill(value, start)
          );
          expect(actualArray).toEqual(expectedArray);
        });
      }
    }
  }

  for (const array of arrays) {
    for (const value of values) {
      for (const start of indexes) {
        for (const end of indexes) {
          test(`array: ${array}, value: ${value}, start: ${start}, end: ${end}`, () => {
            const actualArray = Array.from(array);
            const expectedArray = Array.from(array);

            expect(MyArray.fill(actualArray, value, start, end)).toEqual(
              expectedArray.fill(value, start, end)
            );
            expect(actualArray).toEqual(expectedArray);
          });
        }
      }
    }
  }
});

describe("filter", () => {
  const arrays: Array<Array<any>> = [
    [],
    [100, 200, 300, 400],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [1, 2, 3, 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} length > 1`, () => {
      const fun = (element: any) => {
        return element && element.length > 1;
      };

      const actual = MyArray.filter(array, fun);
      const expected = array.filter(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} truthy`, () => {
      const fun = (element: any) => {
        return !!element;
      };

      const actual = MyArray.filter(array, fun);
      const expected = array.filter(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} greater than previous`, () => {
      const fun = (element: any, index: number, arr: Array<any>) => {
        if (index === 0) {
          return true;
        } else {
          return element > arr[index - 1];
        }
      };

      const actual = MyArray.filter(array, fun);
      const expected = array.filter(fun);
      expect(actual).toEqual(expected);
    });
  }
});

describe("find", () => {
  const arrays: Array<Array<any>> = [
    [],
    [100, 200, 300, 400],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  for (const array of arrays) {
    test(`array: ${array} length > 1`, () => {
      const fun = (element: any) => {
        return (
          (typeof element == "string" || Array.isArray(element)) &&
          element.length > 1
        );
      };

      const actual = MyArray.find(array, fun);
      const expected = array.find(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} truthy`, () => {
      const fun = (element: any) => {
        return !!element;
      };

      const actual = MyArray.find(array, fun);
      const expected = array.find(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} greater than previous`, () => {
      const fun = (element: any, index: number, arr: Array<any>) => {
        if (index === 0) {
          return true;
        } else {
          return element > arr[index - 1];
        }
      };

      const actual = MyArray.find(array, fun);
      const expected = array.find(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} is undefined`, () => {
      const fun = (element: any) => {
        return element === undefined;
      };

      const actual = MyArray.find(array, fun);
      const expected = array.find(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} object`, () => {
      const fun = (element: any) => {
        return element && typeof element === "object" && element.key === "val";
      };

      const actual = MyArray.find(array, fun);
      const expected = array.find(fun);
      expect(actual).toEqual(expected);
    });
  }
});

describe("findIndex", () => {
  const arrays: Array<Array<any>> = [
    [],
    [100, 200, 300, 400],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  for (const array of arrays) {
    test(`array: ${array} length > 1`, () => {
      const fun = (element: any) => {
        return (
          (typeof element == "string" || Array.isArray(element)) &&
          element.length > 1
        );
      };

      const actual = MyArray.findIndex(array, fun);
      const expected = array.findIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} truthy`, () => {
      const fun = (element: any) => {
        return !!element;
      };

      const actual = MyArray.findIndex(array, fun);
      const expected = array.findIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} greater than previous`, () => {
      const fun = (element: any, index: number, arr: Array<any>) => {
        if (index === 0) {
          return true;
        } else {
          return element > arr[index - 1];
        }
      };

      const actual = MyArray.findIndex(array, fun);
      const expected = array.findIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} is undefined`, () => {
      const fun = (element: any) => {
        return element === undefined;
      };

      const actual = MyArray.findIndex(array, fun);
      const expected = array.findIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} object`, () => {
      const fun = (element: any) => {
        return element && typeof element === "object" && element.key === "val";
      };

      const actual = MyArray.findIndex(array, fun);
      const expected = array.findIndex(fun);
      expect(actual).toEqual(expected);
    });
  }
});

describe("findLast", () => {
  const arrays: Array<Array<any>> = [
    [],
    [100, 200, 300, 400],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  for (const array of arrays) {
    test(`array: ${array} length > 1`, () => {
      const fun = (element: any) => {
        return (
          (typeof element == "string" || Array.isArray(element)) &&
          element.length > 1
        );
      };

      const actual = MyArray.findLast(array, fun);
      const expected = array.find(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} truthy`, () => {
      const fun = (element: any) => {
        return !!element;
      };

      const actual = MyArray.find(array, fun);
      const expected = array.find(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} greater than previous`, () => {
      const fun = (element: any, index: number, arr: Array<any>) => {
        if (index === 0) {
          return true;
        } else {
          return element > arr[index - 1];
        }
      };

      const actual = MyArray.findLast(array, fun);
      const expected = array.findLast(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} is undefined`, () => {
      const fun = (element: any) => {
        return element === undefined;
      };

      const actual = MyArray.findLast(array, fun);
      const expected = array.findLast(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} object`, () => {
      const fun = (element: any) => {
        return element && typeof element === "object" && element.key === "val";
      };

      const actual = MyArray.findLast(array, fun);
      const expected = array.findLast(fun);
      expect(actual).toEqual(expected);
    });
  }
});

describe("findLastIndex", () => {
  const arrays: Array<Array<any>> = [
    [],
    [100, 200, 300, 400],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  for (const array of arrays) {
    test(`array: ${array} length > 1`, () => {
      const fun = (element: any) => {
        return (
          (typeof element == "string" || Array.isArray(element)) &&
          element.length > 1
        );
      };

      const actual = MyArray.findLastIndex(array, fun);
      const expected = array.findLastIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} truthy`, () => {
      const fun = (element: any) => {
        return !!element;
      };

      const actual = MyArray.findLastIndex(array, fun);
      const expected = array.findLastIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} greater than previous`, () => {
      const fun = (element: any, index: number, arr: Array<any>) => {
        if (index === 0) {
          return true;
        } else {
          return element > arr[index - 1];
        }
      };

      const actual = MyArray.findLastIndex(array, fun);
      const expected = array.findLastIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} is undefined`, () => {
      const fun = (element: any) => {
        return element === undefined;
      };

      const actual = MyArray.findLastIndex(array, fun);
      const expected = array.findLastIndex(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} object`, () => {
      const fun = (element: any) => {
        return element && typeof element === "object" && element.key === "val";
      };

      const actual = MyArray.findLastIndex(array, fun);
      const expected = array.findLastIndex(fun);
      expect(actual).toEqual(expected);
    });
  }
});

describe("flat", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    [[1], 2, [[], []], [3, 4]],
    [[1], 2, [3, [4], [5, [6, [7], 8], 9, 10, [11, 12]]]],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actual = MyArray.flat(array);
      const expected = array.flat();
      expect(actual).toEqual(expected);
    });

    for (let depth = 0; depth < 7; depth++) {
      test(`array: ${array}, depth: ${depth}`, () => {
        const actual = MyArray.flat(array, depth);
        const expected = array.flat(depth);
        expect(actual).toEqual(expected);
      });
    }

    test(`array: ${array}, depth: ${Infinity}`, () => {
      const actual = MyArray.flat(array, Infinity);
      const expected = array.flat(Infinity);
      expect(actual).toEqual(expected);
    });
  }
});

describe("flatMap", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array} can map`, () => {
      const fun = (element: any) => {
        return Number.isInteger(element) ? element * 2 : element;
      };
      const actual = MyArray.flatMap(array, fun);
      const expected = array.flatMap(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} can flat`, () => {
      const fun = (element: any, index: number) => {
        return Number.isInteger(element)
          ? element * 2
          : index % 2
          ? [element, element]
          : { element: element };
      };

      const actual = MyArray.flatMap(array, fun);
      const expected = array.flatMap(fun);
      expect(actual).toEqual(expected);
    });
  }
});

describe("forEach", () => {
  const arrays: Array<Array<any>> = [
    [],
    [1, , 3, 4, , "six", NaN, undefined, null],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  for (const array of arrays) {
    test(`array: ${array} can copy`, () => {
      const actual: typeof array = [];
      const expected: typeof array = [];

      MyArray.forEach(array, (element, index) => {
        index % 2 ? actual.push(element) : null;
      });
      array.forEach((element, index) => {
        index % 2 ? expected.push(element) : null;
      });
      expect(actual).toEqual(expected);
    });
  }
});

describe("includes", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4], NaN],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  const fromIndexes: Array<number> = [-100, -1, 1, 3, 100];

  const toTests: Array<any> = [
    0,
    -0,
    { key: "val" },
    {},
    3,
    undefined,
    "e",
    "j",
    "k",
    NaN,
  ];

  for (const array of arrays) {
    for (const toTest of toTests) {
      test(`array: ${array} includes ${toTest}`, () => {
        const actual = MyArray.includes(array, toTest);
        const expected = array.includes(toTest);

        expect(actual).toBe(expected);
      });

      for (const fromIndex of fromIndexes) {
        test(`array: ${array} includes ${toTest}, fromIndex; ${fromIndex}`, () => {
          const actual = MyArray.includes(array, toTest, fromIndex);
          const expected = array.includes(toTest, fromIndex);

          expect(actual).toBe(expected);
        });
      }
    }
  }
});

describe("indexOf", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4], NaN],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  const fromIndexes: Array<number> = [-100, -1, 1, 3, 100];

  const toTests: Array<any> = [
    0,
    -0,
    { key: "val" },
    {},
    3,
    undefined,
    "e",
    "j",
    "k",
    NaN,
  ];

  for (const array of arrays) {
    for (const toTest of toTests) {
      test(`array: ${array} indexOf ${toTest}`, () => {
        const actual = MyArray.indexOf(array, toTest);
        const expected = array.indexOf(toTest);

        expect(actual).toBe(expected);
      });

      for (const fromIndex of fromIndexes) {
        test(`array: ${array} indexOf ${toTest}, fromIndex; ${fromIndex}`, () => {
          const actual = MyArray.indexOf(array, toTest, fromIndex);
          const expected = array.indexOf(toTest, fromIndex);

          expect(actual).toBe(expected);
        });
      }
    }
  }
});

describe("join", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4], NaN],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  const separators: Array<any> = [undefined, 0, "e", ", ", "+"];

  for (const array of arrays) {
    for (const separator of separators) {
      test(`array: ${array} join with ${separator}`, () => {
        const actual = MyArray.join(array, separator);
        const expected = array.join(separator);

        expect(actual).toBe(expected);
      });
    }
  }
});

describe("keys", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actualIterator = MyArray.keys(array);
      const expectedIterator = array.keys();

      let actual = actualIterator.next();
      let expected = expectedIterator.next();
      expect<boolean | undefined>(actual.done).toBe(expected.done);

      while (!expected.done) {
        expect(actual.value).toEqual(expected.value);

        actual = actualIterator.next();
        expected = expectedIterator.next();
        expect<boolean | undefined>(actual.done).toBe(expected.done);
      }
    });
  }
});

describe("lastIndexOf", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4], NaN],
    [{ key: "val" }, { key: "lue" }, { key: "val" }, { key: "lue" }],
  ];

  const fromIndexes: Array<number> = [-100, -1, 1, 3, 100];

  const toTests: Array<any> = [
    0,
    -0,
    { key: "val" },
    {},
    3,
    undefined,
    "e",
    "j",
    "k",
    NaN,
  ];

  for (const array of arrays) {
    for (const toTest of toTests) {
      test(`array: ${array} lastIndexOf ${toTest}`, () => {
        const actual = MyArray.lastIndexOf(array, toTest);
        const expected = array.lastIndexOf(toTest);

        expect(actual).toBe(expected);
      });

      for (const fromIndex of fromIndexes) {
        test(`array: ${array} lastIndexOf ${toTest}, fromIndex; ${fromIndex}`, () => {
          const actual = MyArray.lastIndexOf(array, toTest, fromIndex);
          const expected = array.lastIndexOf(toTest, fromIndex);

          expect(actual).toBe(expected);
        });
      }
    }
  }
});

describe("pop", () => {
  const arrays: Array<Array<any>> = [
    [],
    [1, , 3, 4, , "six"],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actualArray = Array.from(array);
      const expectedArray = Array.from(array);
      const actualReturn = MyArray.pop(actualArray);
      const expectedReturn = expectedArray.pop();
      expect(actualReturn).toBe(expectedReturn);
      expect(actualArray).toEqual(expectedArray);
    });
  }
});

describe("push", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [1, 2, [3, 4]],
  ];

  const elements: Array<any> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [1, 2, [3, 4]],
    "six",
    3,
  ];

  for (const array1 of arrays) {
    for (const element of elements) {
      test(`array1: ${array1}, element: ${element}`, () => {
        const actualArray1 = Array.from(array1);
        const expectedArray1 = Array.from(array1);
        const actualCount = MyArray.push(actualArray1, element);
        const expectedCount = expectedArray1.push(element);
        expect(actualCount).toBe(expectedCount);
        expect(actualArray1).toEqual(expectedArray1);
      });
    }
  }
});

describe("map", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array} can map`, () => {
      const fun = (element: any) => {
        return Number.isInteger(element) ? element * 2 : element;
      };
      const actual = MyArray.map(array, fun);
      const expected = array.map(fun);
      expect(actual).toEqual(expected);
    });

    test(`array: ${array} won't flat`, () => {
      const fun = (element: any, index: number) => {
        return Number.isInteger(element)
          ? element * 2
          : index % 2
          ? [element, element]
          : { element: element };
      };

      const actual = MyArray.map(array, fun);
      const expected = array.map(fun);
      expect(actual).toEqual(expected);
    });
  }
});

describe("reduce", () => {
  test(`empty array with no initial`, () => {
    expect(() => {
      MyArray.reduce([], () => {});
    }).toThrowError(
      new TypeError("Reduce of empty array with no initial value")
    );
  });

  test(`empty array with initial`, () => {
    expect(MyArray.reduce([], () => 2, 1)).toBe(1);
  });

  const arrays: Array<Array<any>> = [
    [0, 1, , 2, 3, 4, 100],
    [undefined, null],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array} can reduce`, () => {
      const fun = (acc: any, element: any) => {
        return acc + element;
      };
      const actual = MyArray.reduce(array, fun);
      const expected = array.reduce(fun);
      expect(actual).toEqual(expected);
    });

    const initials = [30, "hi"];
    for (const initial of initials) {
      test(`array: ${array} can with initial ${initial}`, () => {
        const fun = (acc: any, element: any) => {
          return acc + element;
        };
        const actual = MyArray.reduce(array, fun, initial);
        const expected = array.reduce(fun, initial);
        expect(actual).toEqual(expected);
      });
    }
  }

  const array = [100, 3, 4, 2];
  test(`array: ${array} is reduced from left to right`, () => {
    const fun = (acc: any, element: any) => {
      return acc - element;
    };
    const actual = MyArray.reduce(array, fun);
    const expected = array.reduce(fun);
    expect(actual).toEqual(expected);
  });
});

describe("reduceRight", () => {
  test(`empty array with no initial`, () => {
    expect(() => {
      MyArray.reduceRight([], () => {});
    }).toThrowError(
      new TypeError("Reduce of empty array with no initial value")
    );
  });

  test(`empty array with initial`, () => {
    expect(MyArray.reduceRight([], () => 2, 1)).toBe(1);
  });

  const arrays: Array<Array<any>> = [
    [0, 1, , 2, 3, 4, 100],
    [undefined, null],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array} can reduceRight`, () => {
      const fun = (acc: any, element: any) => {
        return acc + element;
      };
      const actual = MyArray.reduceRight(array, fun);
      const expected = array.reduceRight(fun);
      expect(actual).toEqual(expected);
    });

    const initials = [30, "hi"];
    for (const initial of initials) {
      test(`array: ${array} can with initial ${initial}`, () => {
        const fun = (acc: any, element: any) => {
          return acc + element;
        };
        const actual = MyArray.reduceRight(array, fun, initial);
        const expected = array.reduceRight(fun, initial);
        expect(actual).toEqual(expected);
      });
    }
  }

  const array = [100, 3, 4, 2];
  test(`array: ${array} is reduced from right to left`, () => {
    const fun = (acc: any, element: any) => {
      return acc - element;
    };
    const actual = MyArray.reduceRight(array, fun);
    const expected = array.reduceRight(fun);
    expect(actual).toEqual(expected);
  });
});

describe("reverse", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [, , , 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} can reverse`, () => {
      const actualArray = Array.from(array);
      const expectedArray = Array.from(array);
      const actual = MyArray.reverse(actualArray);
      const expected = expectedArray.reverse();

      expect(actual).toEqual(expected);
      expect(actual).toEqual(actualArray);
      expect(expected).toEqual(expectedArray);
    });
  }
});

describe("shift", () => {
  const arrays: Array<Array<any>> = [
    [],
    [1, , 3, 4, , "six"],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actualArray = Array.from(array);
      const expectedArray = Array.from(array);
      const actualReturn = MyArray.shift(actualArray);
      const expectedReturn = expectedArray.shift();
      expect(actualReturn).toBe(expectedReturn);
      expect(actualArray).toEqual(expectedArray);
    });
  }
});

describe("slice", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [1, [2, 3, 4], 5],
  ];
  const indexes = [-100, -1, 0, 3, 8, 100];

  for (const array of arrays) {
    test(`array: ${array}, slice all`, () => {
      expect(MyArray.slice(array)).toEqual(array.slice());
    });
  }

  for (const array of arrays) {
    for (const start of indexes) {
      test(`array: ${array}, start: ${start}`, () => {
        expect(MyArray.slice(array, start)).toEqual(array.slice(start));
      });
    }
  }

  for (const array of arrays) {
    for (const start of indexes) {
      for (const end of indexes) {
        test(`array: ${array}, start: ${start}, end: ${end}`, () => {
          expect(MyArray.slice(array, start, end)).toEqual(
            array.slice(start, end)
          );
        });
      }
    }
  }
});

describe("some", () => {
  const arrays: Array<Array<any>> = [
    [],
    [100, 200, 300, 400],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [1, 2, 3, 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} length > 0`, () => {
      const fun = (element: any) => {
        return element.length > 0;
      };

      const actual = MyArray.some(array, fun);
      const expected = array.some(fun);
      expect(actual).toBe(expected);
    });

    test(`array: ${array} truthy`, () => {
      const fun = (element: any) => {
        return !!element;
      };

      const actual = MyArray.some(array, fun);
      const expected = array.some(fun);
      expect(actual).toBe(expected);
    });

    test(`array: ${array} ascending`, () => {
      const fun = (element: any, index: number, arr: Array<any>) => {
        if (index === 0) {
          return true;
        } else {
          return element > arr[index - 1];
        }
      };

      const actual = MyArray.some(array, fun);
      const expected = array.some(fun);
      expect(actual).toBe(expected);
    });
  }
});

describe("sort", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [, , , 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} can sort`, () => {
      const actualArray = Array.from(array);
      const expectedArray = Array.from(array);
      const actual = MyArray.sort(actualArray);
      const expected = expectedArray.sort();

      expect(actual).toEqual(expected);
      expect(actual).toEqual(actualArray);
      expect(expected).toEqual(expectedArray);
    });
  }

  const a = [
    89, 34, 341, 3, 2, 9, 7, 0, 0, 56, 294, 87, 65, 92, -34, -36, 847, 42,
  ];

  test(`array: ${a} sort asc`, () => {
    const actualArray = Array.from(a);
    const expectedArray = Array.from(a);
    const fun = (a: number, b: number) => a - b;
    const actual = MyArray.sort(actualArray, fun);
    const expected = expectedArray.sort(fun);

    expect(actual).toEqual(expected);
    expect(actual).toEqual(actualArray);
    expect(expected).toEqual(expectedArray);
  });

  test(`array: ${a} sort desc`, () => {
    const actualArray = Array.from(a);
    const expectedArray = Array.from(a);
    const fun = (a: number, b: number) => b - a;
    const actual = MyArray.sort(actualArray, fun);
    const expected = expectedArray.sort(fun);

    expect(actual).toEqual(expected);
    expect(actual).toEqual(actualArray);
    expect(expected).toEqual(expectedArray);
  });
});

describe("splice", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, undefined, 100],
    [[1], 2, [3, 4]],
    [, 4],
  ];

  const indexes = [-100, -1, 0, 3, 100];

  for (const array of arrays) {
    for (const start of indexes) {
      test(`array: ${array}, start: ${start}`, () => {
        const actualArray = Array.from(array);
        const expectedArray = Array.from(array);

        const actual = MyArray.splice(actualArray, start);
        const expected = expectedArray.splice(start);

        expect(actual).toEqual(expected);
        expect(actualArray).toEqual(expectedArray);
      });

      for (const end of indexes) {
        test(`array: ${array}, start: ${start}, end: ${end}`, () => {
          const actualArray = Array.from(array);
          const expectedArray = Array.from(array);

          const actual = MyArray.splice(actualArray, start, end);
          const expected = expectedArray.splice(start, end);

          expect(actual).toEqual(expected);
          expect(actualArray).toEqual(expectedArray);
        });

        for (const elements of arrays) {
          test(`array: ${array}, start: ${start}, end: ${end}, elements: ${elements}`, () => {
            const actualArray = Array.from(array);
            const expectedArray = Array.from(array);

            const actual = MyArray.splice(actualArray, start, end, ...elements);
            const expected = expectedArray.splice(start, end, ...elements);

            expect(actual).toEqual(expected);
            expect(actualArray).toEqual(expectedArray);
          });
        }
      }
    }
  }
});

describe("toLocaleString", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, undefined, 100],
    [[1], 2, [3, 4]],
    [1, "a", new Date("2025-01-01")],
    [, 4],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actual = MyArray.toLocaleString(array);
      const expected = array.toLocaleString();

      expect(actual).toBe(expected);
    });
  }

  const array = [0, 2, 4, 6];
  const locales = "ja-JP";
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "JPY",
  };

  test(`array: ${array} JPY`, () => {
    const actual = MyArray.toLocaleString(array, locales, options);
    const expected = array.toLocaleString(locales, options);

    expect(actual).toBe(expected);
  });
});

describe("toReversed", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [, , , 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} can reverse`, () => {
      const actual = MyArray.toReversed(array);
      const expected = array.toReversed();

      expect(actual).toEqual(expected);
    });
  }
});

describe("toSorted", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [, , , 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} can sort`, () => {
      const actual = MyArray.toSorted(array);
      const expected = array.toSorted();

      expect(actual).toEqual(expected);
    });
  }

  const a = [
    89, 34, 341, 3, 2, 9, 7, 0, 0, 56, 294, 87, 65, 92, -34, -36, 847, 42,
  ];

  test(`array: ${a} sort asc`, () => {
    const fun = (a: number, b: number) => a - b;
    const actual = MyArray.toSorted(a, fun);
    const expected = a.toSorted(fun);

    expect(actual).toEqual(expected);
  });

  test(`array: ${a} sort desc`, () => {
    const fun = (a: number, b: number) => b - a;
    const actual = MyArray.toSorted(a, fun);
    const expected = a.toSorted(fun);

    expect(actual).toEqual(expected);
  });
});

describe("toSpliced", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, undefined, 100],
    [[1], 2, [3, 4]],
    [, 4],
  ];

  const indexes = [-100, -1, 0, 3, 100];

  for (const array of arrays) {
    for (const start of indexes) {
      test(`array: ${array}, start: ${start}`, () => {
        const actual = MyArray.toSpliced(array, start);
        const expected = array.toSpliced(start);

        expect(actual).toEqual(expected);
      });

      for (const end of indexes) {
        test(`array: ${array}, start: ${start}, end: ${end}`, () => {
          const actual = MyArray.toSpliced(array, start, end);
          const expected = array.toSpliced(start, end);

          expect(actual).toEqual(expected);
        });

        for (const elements of arrays) {
          test(`array: ${array}, start: ${start}, end: ${end}, elements: ${elements}`, () => {
            const actual = MyArray.toSpliced(array, start, end, ...elements);
            const expected = array.toSpliced(start, end, ...elements);

            expect(actual).toEqual(expected);
          });
        }
      }
    }
  }
});

describe("toString", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, undefined, 100],
    [[1], 2, [3, 4]],
    [1, "a", new Date("2025-01-01")],
    [, 4],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actual = MyArray.toString(array);
      const expected = array.toString();

      expect(actual).toBe(expected);
    });
  }
});

describe("unshift", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, undefined, 100],
    [[1], 2, [3, 4]],
    [1, "a", new Date("2025-01-01")],
    [, 4],
  ];

  for (const array of arrays) {
    test(`array: ${array} with empty elements`, () => {
      const actualArray = Array.from(array);
      const expectedArray = Array.from(array);

      const actual = MyArray.unshift(actualArray);
      const expected = expectedArray.unshift();

      expect(actual).toBe(expected);
      expect(actualArray).toEqual(expectedArray);
    });

    for (const elements of arrays) {
      test(`array: ${array}, elements: ${elements}`, () => {
        const actualArray = Array.from(array);
        const expectedArray = Array.from(array);

        const actual = MyArray.unshift(actualArray, ...elements);
        const expected = expectedArray.unshift(...elements);

        expect(actual).toBe(expected);
        expect(actualArray).toEqual(expectedArray);
      });
    }
  }
});

describe("values", () => {
  const arrays: Array<Array<any>> = [
    [],
    [0, 1, , 2, 3, 4, , "six", NaN, null, undefined, 100],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    [[1], 2, [3, 4]],
    [new Date()],
  ];

  for (const array of arrays) {
    test(`array: ${array}`, () => {
      const actualIterator = MyArray.values(array);
      const expectedIterator = array.values();

      let actual = actualIterator.next();
      let expected = expectedIterator.next();
      expect<boolean | undefined>(actual.done).toBe(expected.done);

      while (!expected.done) {
        expect(actual.value).toEqual(expected.value);

        actual = actualIterator.next();
        expected = expectedIterator.next();
        expect<boolean | undefined>(actual.done).toBe(expected.done);
      }
    });
  }
});

describe("with", () => {
  const arrays: Array<Array<any>> = [
    [0, 1, , 2, 3, 4, , "six"],
    [NaN, null, undefined, undefined, 100],
    [[1], 2, [3, 4]],
    [, 4, 3],
  ];

  const indexes = [-1, 0, 2];
  const values = [-100, 3, NaN, null, undefined, new Date()];

  for (const array of arrays) {
    for (const index of indexes) {
      for (const value of values) {
        test(`array: ${array}, index: ${index}, value: ${value}`, () => {
          const actual = MyArray.with(array, index, value);
          const expected = array.with(index, value);

          expect(actual).toEqual(expected);
        });
      }
    }
  }

  const invalidIndexes = [-100, 100];
  for (const array of arrays) {
    for (const index of invalidIndexes) {
      test(`array: ${array}, index: ${index} to throw`, () => {
        expect(() => {
          MyArray.with(array, index, 10);
        }).toThrowError(new RangeError("Array index out of range"));
      });
    }
  }
});
