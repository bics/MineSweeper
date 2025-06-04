//Contents taken from ChatGPT

// 🔹 Basic Equality
expect(value).toBe(expected);             // strict equality (===)
expect(value).toEqual(expected);          // deep equality
expect(value).not.toBe(expected);         // negation

expect(value).toStrictEqual(expected); 

// 🔹 Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// 🔹 Numbers
expect(value).toBeGreaterThan(number);
expect(value).toBeGreaterThanOrEqual(number);
expect(value).toBeLessThan(number);
expect(value).toBeLessThanOrEqual(number);
expect(value).toBeCloseTo(number, numDigits); // for floating point numbers

// 🔹 Strings
expect(string).toMatch(/regex/);
expect(string).toContain("substring");

// 🔹 Arrays & Iterables
expect(array).toContain(item);
expect(array).toHaveLength(length);

// 🔹 Objects
expect(object).toHaveProperty("key");
expect(object).toHaveProperty("key", value);

// 🔹 Errors
expect(() => {
  throw new Error("fail");
}).toThrow();

expect(() => {
  throw new Error("fail");
}).toThrow("fail");

// 🔹 Asynchronous Code
await expect(Promise.resolve(5)).resolves.toBe(5);
await expect(Promise.reject("fail")).rejects.toBe("fail");

// 🔹 Custom Matchers (optional extension)
expect.extend({
  // your custom matcher functions
});
