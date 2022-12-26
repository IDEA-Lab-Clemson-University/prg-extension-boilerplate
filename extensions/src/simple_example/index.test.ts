import { createTestSuite } from "$testing";
import Extension from '.';

createTestSuite(Extension,
  {
    unitTests: {
      log: [{
        input: "s",
      }],
      dummyUI: [],
      counterUI: [],
      colorUI: []
    },
    integrationTests: undefined
  });