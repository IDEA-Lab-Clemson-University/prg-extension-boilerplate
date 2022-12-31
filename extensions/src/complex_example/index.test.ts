import { getValueFromMenuItem } from "$common";
import { createTestSuite } from "$testing";
import Extension, { Animal } from ".";

createTestSuite({ Extension, __dirname }, {
  unitTests: {
    add: { input: [4, 8], expected: 12 },
    addAnimalToCollection: ({ expect }) => {
      let startingCount: number;
      const input = Animal.Tiger;
      return {
        input,
        before: (extension) => { startingCount = extension.collection.length },
        after: ({ collection }) => {
          expect(collection.length).toBe(startingCount + 1);
          const animal = collection[startingCount];
          const value = getValueFromMenuItem(animal);
          expect(value).toBe(input);
        }
      }
    }
  },
  integrationTests: {
    multipliesGiveSameResult: async (runner, { expect }) => {
      const left = 4;
      const right = 5;
      const { output: outputFromSelf } = await runner.invoke("multiplyUsingSelf", left, right);
      const { output: outputFromThis } = await runner.invoke("multiplyUsingThis", left, right);
      expect(outputFromSelf).toBe(outputFromThis);
      expect(outputFromSelf).toBe(left * right);
    }
  }
})